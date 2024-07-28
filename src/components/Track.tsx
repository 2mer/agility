import { Droppable } from 'react-beautiful-dnd';
import { Task as ITask } from '../logic/Task';
import Task from './Task';
import { GameContext } from './GameContext';
import { StatusMachine } from './Dashboard';
import { useSignals } from '@preact/signals-react/runtime';
import { twMerge } from 'tailwind-merge';

const LaneDisplay = {
	todo: {
		name: '💭 Todo',
	},
	inProgress: {
		name: '⚙ In Progress',
	},
	onHold: {
		name: '⏸ On Hold',
	},
	done: {
		name: '✅ Done',
	},
};

function Track({ items, id }: { items: ITask[]; id: string }) {
	useSignals();

	const { dragId$, game } = GameContext.use();

	const fromId = dragId$.value;

	const enabled =
		fromId === id ||
		StatusMachine?.[fromId as keyof typeof StatusMachine]?.includes(id);

	const { name } = LaneDisplay[id as keyof typeof LaneDisplay];

	return (
		<Droppable key={id} droppableId={id} isDropDisabled={!enabled}>
			{(provided, snapshot) => (
				<div
					className='flex flex-col gap-4 flex-1'
					{...(id === 'todo' && {
						'data-tour-step': 'employees-todo',
					})}
				>
					<div>{name}</div>

					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={twMerge(
							'bg-slate-200 rounded-md p-4 flex-1 item-start transition-all duration-200 overflow-auto',
							game.isPaused() && 'bg-orange-100',
							fromId && !enabled && 'bg-red-300'
						)}
					>
						{items.map((task, i) => (
							<Task
								task={task}
								index={i}
								key={task.id}
								laneId={id}
							/>
						))}
						{provided.placeholder}
					</div>
				</div>
			)}
		</Droppable>
	);
}

export default Track;
