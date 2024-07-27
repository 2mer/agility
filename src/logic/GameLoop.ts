import { intersects } from "radash";
import { GameState } from "../hooks/useGameState";
import { EmployeeGenerator } from "./EmployeeGenerator";
import { Internals } from "./Internals";
import { add, allGt0, clamp0, createStats, Stats, statsZeroed as statsEmpty, statsResources, sub } from "./Stats";
import { Task } from "./Task";
import { TaskGenerator, taskGeneratorByResources } from "./TaskGenerator";

const TICK_SPEED_MS = 2_500;

export class GameLoop {

	public taskGenerator: TaskGenerator;
	public employeeGenerator = new EmployeeGenerator();


	constructor(private internals: Internals) {
		this.taskGenerator = this.createTaskGenerator(internals.store.state);

		if (!this.isPaused()) {
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
	}

	pause() {
		clearInterval(this.tickInterval);

		this.internals.store.update(state => {
			state.paused = true;
		})
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
		return createStats({
			Engineering: level,
			Design: Math.max(0, level - 5),
			Marketing: Math.max(0, level - 15),
			Testing: Math.max(0, level - 20),
			Data: Math.max(0, level - 25),
			Cloud: Math.max(0, level - 30),
			Security: Math.max(0, level - 35),
		});
	}

	createTaskGenerator(state: GameState) {
		return taskGeneratorByResources(statsResources(state.world.threshold));
	}

	setLevel(state: GameState, level: number) {
		state.world.time = 0;
		state.world.sprintDuration = 100;
		state.world.level = level;
		state.world.threshold = this.getThresholdScore(level);

		this.taskGenerator = this.createTaskGenerator(state);
	}

	startGame() {

		this.internals.store.update(state => {
			this.setLevel(state, 1);
		});

		this.start();
	}

	isStarted() {
		return this.internals.store.state.world.level > 0;
	}

	tick() {
		if (this.internals.store.state.paused) return;

		this.internals.store.update(state => {
			state.world.time++;

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
					state.world.score = add(state.world.score, task.requirements);
				} else if (!intersects(statsResources(assignee.stats), statsResources(remainder))) {
					this.moveTaskToLane(state, task, 'inProgress', 'onHold');
				} else {
					availableAssignees.splice(availableAssignees.findIndex(e => e.id === assignee.id), 1);
				}
			})

			if (state.world.time >= state.world.sprintDuration) {
				const isPassing = allGt0(sub(state.world.score, state.world.threshold))

				// todo: tick for damage from bugs

				if (isPassing) {
					this.setLevel(state, state.world.level + 1)
				} else {
					this.setLevel(state, state.world.level)
				}
			}

			if (!state.world.lanes['todo'].length) {
				const newTasks = Array.from({ length: 5 }, (_) => this.taskGenerator.generate());

				state.world.lanes['todo'].push(...newTasks);
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