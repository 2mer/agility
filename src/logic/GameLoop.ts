import { intersects, memo } from "radash";
import { GameState } from "../hooks/useGameState";
import { EmployeeGenerator } from "./EmployeeGenerator";
import { Internals } from "./Internals";
import { add, allGt0, clamp0, createStats, Stats, statsZeroed as statsEmpty, statsResources, sub } from "./Stats";
import { Task } from "./Task";
import { TaskGenerator, taskGeneratorByResources } from "./TaskGenerator";
import { v4 } from "uuid";
import JSConfetti from 'js-confetti';
import { sounds } from "./sounds";

const TICK_SPEED_MS = 2_500;

export class GameLoop {

	public taskGenerator: TaskGenerator;
	public employeeGenerator = new EmployeeGenerator();
	public confetti = new JSConfetti();


	constructor(private internals: Internals) {
		this.taskGenerator = this.createTaskGenerator(internals.store.state.world.level);

		if (this.isStarted() && !this.isPaused()) {
			this.start();
		}
	}

	moveTaskToLane(state: GameState, task: Task, fromLane: string, toLane: string) {
		const f = state.world.lanes[fromLane];
		const t = state.world.lanes[toLane];

		f.splice(f.indexOf(task), 1);
		t.unshift(task);
	}

	private tickInterval: any = null;

	start() {
		this.internals.store.update(state => {
			state.paused = false;
		})

		this.tickInterval = setInterval(() => {
			this.tick();
		}, TICK_SPEED_MS);

		sounds.click.play();
	}

	pause() {
		clearInterval(this.tickInterval);

		this.internals.store.update(state => {
			state.paused = true;
		})

		sounds.click.play();
	}

	togglePauseState() {
		if (this.isPaused()) {
			this.start();
		} else {
			this.pause();
		}
	}

	isPaused() {
		return this.internals.store.state.paused
	}

	getThresholdScore(level: number): Stats {

		function stat(start: number, grow: number) {
			return Math.max(0, (level - start) * grow)
		}

		return createStats({
			Engineering: stat(0, 5),
			Design: stat(1, 5),
			Marketing: stat(2, 5),
			Testing: stat(3, 5),
			Data: stat(4, 5),
			Cloud: stat(5, 5),
			Security: stat(6, 5),
		});
	}

	createTaskGenerator(level: number) {
		return taskGeneratorByResources(statsResources(this.getThresholdScore(level)));
	}

	setLevel(state: GameState, level: number) {
		state.world.time = 0;
		state.world.sprintDuration = 20;
		state.world.level = level;
		state.world.threshold = this.getThresholdScore(level);
		state.world.maxEmployees = level + 1;

		this.taskGenerator = this.createTaskGenerator(level);
	}

	startGame({ name }: { name: string }) {

		const employees = [
			{
				id: v4(),
				name,
				stats: createStats({ Engineering: 1 }),
			}
		];
		this.taskGenerator = this.createTaskGenerator(1);

		const tasks = this.generateTasks();

		const shopEmployees = this.generateShopEmployees()

		this.internals.store.update(state => {
			this.setLevel(state, 1);

			state.world.name = name;

			state.world.employees = employees;

			this.pushTasks(state, tasks);

			state.world.storeEmployees = shopEmployees;

			state.paused = true;

		});
	}

	generateShopEmployees() {
		return Array.from({ length: 3 }, () => this.employeeGenerator.nextEmployee());
	}

	isStarted() {
		return this.internals.store.state.world.level > 0;
	}

	isDead() {
		return this.internals.store.state.world.health <= 0;
	}

	kill() {
		this.pause();

		this.internals.store.update(state => {
			state.world.health = 0;
		});
	}

	pushTasks(state: GameState, tasks: Task[]) {
		state.world.lanes['todo'].push(...tasks);
	}

	generateTasks() {
		const tasks = Array.from({ length: 5 }, (_) => this.taskGenerator.generate());

		return tasks;
	}

	tick() {
		if (this.internals.store.state.paused) return;

		sounds.tick.play();

		const genTasks = memo(() => this.generateTasks());

		this.internals.store.update(state => {
			state.world.time++;

			if (state.world.rerollCooldown > 0)
				state.world.rerollCooldown--;

			const availableAssignees = state.world.employees.slice();

			// tick tasks
			state.world.lanes.inProgress.forEach(task => {
				if (!task.assignee) return;

				const assignee = state.world.employees.find(e => e.id === task.assignee);
				if (!assignee) return;

				task.progress = (add(task.progress, assignee.stats, statsResources(task.requirements)));

				const remainder = clamp0(sub(task.requirements, task.progress));

				if (statsEmpty(remainder)) {
					this.moveTaskToLane(state, task, 'inProgress', 'done');
					task.assignee = undefined;
					task.progress = createStats(task.requirements);
					state.world.score = add(state.world.score, task.requirements);
					sounds.taskComplete.play();
				} else if (!intersects(statsResources(assignee.stats), statsResources(remainder))) {
					this.moveTaskToLane(state, task, 'inProgress', 'onHold');
					sounds.click.play();
				} else {
					availableAssignees.splice(availableAssignees.findIndex(e => e.id === assignee.id), 1);
				}
			})

			if (state.world.time >= state.world.sprintDuration) {
				const isPassing = allGt0(sub(state.world.score, state.world.threshold))

				// todo: tick for damage from bugs

				if (isPassing) {
					this.setLevel(state, state.world.level + 1)
					this.confetti.addConfetti()
					sounds.taskComplete.play();
				} else {
					this.setLevel(state, state.world.level)
					state.world.health--;
					sounds.damage.play();

					if (state.world.health <= 0) {
						clearInterval(this.tickInterval);
						state.paused = true;
					}
				}
			}

			if (!state.world.lanes['todo'].length) {
				this.pushTasks(state, genTasks());
			}

			// tick employees
			availableAssignees.forEach(employee => {
				const foundAssignedTask = state.world.lanes['todo'].find(t => t.assignee === employee.id);
				if (!foundAssignedTask) return;

				this.moveTaskToLane(state, foundAssignedTask, 'todo', 'inProgress');
			})
		})
	}
}