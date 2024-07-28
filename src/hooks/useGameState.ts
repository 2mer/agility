import { useLocalStorage } from "@mantine/hooks"
import { produce } from "immer"
import { useCallback, useEffect } from "react"
import { Task } from "../logic/Task"
import { Project } from "../logic/Project"
import { Employee } from "../logic/Employee"
import { v4 } from "uuid"
import { createStats, Stats } from "@/logic/Stats"

export type World = {
	name: string,
	health: number,
	maxHealth: number,
	rerollCooldown: number,
	score: Stats,
	threshold: Stats,
	time: number,
	sprintDuration: number,
	level: number,
	lanes: { [key: string]: Task[] },
	project: Project,
	employees: Employee[],
	storeEmployees: Employee[],
	maxEmployees: number,
}

export type GameState = {
	version: string,

	world: World,

	paused: boolean,
	onboarding: boolean,

	preferences: {
	},
}

export const STORAGE_KEY = 'agility-state';
export const GAME_VERSION = 'v1.0.0';

const defaultState: GameState = {
	version: GAME_VERSION,
	preferences: {},
	paused: false,
	onboarding: true,
	world: {
		name: 'Dev',
		health: 3,
		maxHealth: 3,
		rerollCooldown: 0,
		employees: [],
		storeEmployees: [],
		maxEmployees: 1,
		level: 0,
		project: {
			domains: ['Engineering'],
			id: v4(),
		},
		score: createStats(),
		threshold: createStats(),
		time: 0,
		sprintDuration: 0,
		lanes: {
			todo: [],
			inProgress: [],
			onHold: [],
			done: [],
		}
	}
}

export function useGameState() {
	const [state, setState] = useLocalStorage<GameState>({
		key: STORAGE_KEY,
		getInitialValueInEffect: false,
		defaultValue: defaultState
	})

	useEffect(() => {
		if (state.version !== defaultState.version) {
			setState(defaultState);
		}
	}, [])

	const update = useCallback((transform: (state: GameState) => void) => setState(prev => produce(prev, transform)), [setState]);

	return [state, update] as const;
}