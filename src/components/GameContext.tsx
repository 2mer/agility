import { createContext } from '@sgty/kontext-react';
import { useConst } from '../hooks/useConst';
import { GameLoop } from '../logic/GameLoop';
import { useGameState } from '../hooks/useGameState';
import { useAsRef } from '../hooks/useAsRef';
import { useSignal } from '@preact/signals-react';

export const GameContext = createContext(() => {
	const [state, update] = useGameState();

	const stateRef = useAsRef(state);

	const dragId$ = useSignal<string>();

	const internals = useConst(() => ({
		store: {
			get state() {
				return stateRef.current;
			},

			update,
		},
	}));

	return {
		game: useConst(() => new GameLoop(internals)),
		dragId$,
	};
});
