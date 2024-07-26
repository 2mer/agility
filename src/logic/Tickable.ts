import { GameState } from "../hooks/useGameState"

export type Tickable = {
	tick: (state: GameState) => void
}