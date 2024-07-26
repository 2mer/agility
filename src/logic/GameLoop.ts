import { GameState } from "../hooks/useGameState";
import { Internals } from "./Internals";
import { clamp0, statsZeroed, sub } from "./Stats";
import { Task } from "./Task";

const TICK_SPEED_MS = 2_500;

export class GameLoop {

	constructor(private internals: Internals) {
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
			state.paused = false;
		})
	}

	getThresholdScore(level: number) {
		return (level + 1) * 20 + (level * level);
	}

	setLevel(state: GameState, level: number) {
		state.world.time = 0;
		state.world.sprintDuration = 100;
		state.world.level = level;
	}

	tick() {
		if (this.internals.store.state.paused) return;

		this.internals.store.update(state => {
			state.world.time++;

			// tick tasks
			state.world.lanes.inProgress.forEach(task => {
				if (!task.assignee) return;

				const assignee = state.world.employees.find(e => e.id === task.assignee);
				if (!assignee) return;

				task.requirements = clamp0(sub(task.requirements, assignee.stats));

				if (statsZeroed(task.requirements)) {
					this.moveTaskToLane(state, task, 'inProgress', 'done');
					state.world.score += task.score;
				}
			})

			if (state.world.time >= state.world.sprintDuration) {
				const isPassing = state.world.score >= this.getThresholdScore(state.world.level);

				// todo: tick for damage from bugs

				if (isPassing) {
					this.setLevel(state, state.world.level + 1)
				} else {
					this.setLevel(state, state.world.level)
				}
			}

			// tick employees
			// state.world.employees.forEach(employee => {

			// })
		})
	}
}