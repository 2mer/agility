import { createContext } from '@sgty/kontext-react';
import { useConst } from '../hooks/useConst';
import { GameLoop } from '../logic/GameLoop';
import { useGameState } from '../hooks/useGameState';
import { useAsRef } from '../hooks/useAsRef';
import { taskGeneratorByProject } from '../logic/TaskGenerator';
import { useMemo } from 'react';
import { useSignal } from '@preact/signals-react';
import { EmployeeGenerator } from '../logic/EmployeeGenerator';

export const GameContext = createContext(() => {
	const [state, update] = useGameState();

	const stateRef = useAsRef(state);

	const internals = useConst(() => ({
		store: {
			get state() {
				return stateRef.current;
			},

			update,
		},
	}));

	const taskGenerator = useMemo(
		() => taskGeneratorByProject(state.world.project),
		[state.world.project]
	);

	const dragId$ = useSignal<string>();

	const employeeGenerator = useConst(() => new EmployeeGenerator());

	return {
		game: useConst(() => new GameLoop(internals)),
		taskGenerator,
		dragId$,
		employeeGenerator,
	};
});
