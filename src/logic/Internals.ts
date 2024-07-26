import { GameState } from "../hooks/useGameState"

export type Store = {
	state: GameState,
	update: (updater: (state: GameState) => void) => void
}

export type Internals = {
	store: Store;
}