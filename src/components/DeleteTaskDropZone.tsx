import { useSignals } from '@preact/signals-react/runtime';
import { GameContext } from './GameContext';
import { StatusMachine } from './Dashboard';
import { Droppable } from 'react-beautiful-dnd';
import { IconTrash } from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';

function DeleteTask() {
	useSignals();

	const id = 'delete';

	const { dragId$, game } = GameContext.use();

	const fromId = dragId$.value;

	const enabled =
		fromId === id ||
		StatusMachine?.[fromId as keyof typeof StatusMachine]?.includes(id);

	// if (!enabled) return null;

	return (
		<div className='bottom-10 flex justify-center w-full pointer-events-none'>
			<Droppable droppableId={id} isDropDisabled={!enabled}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={twMerge(
							'border-4 border-solid border-slate-500 text-slate-500 bg-slate-200 rounded-3xl h-20 shadow-md w-[400px] flex justify-center items-center',
							!enabled && 'opacity-50'
						)}
					>
						<IconTrash />
					</div>
				)}
			</Droppable>
		</div>
	);
}

export default DeleteTask;
