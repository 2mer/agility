import { Droppable } from 'react-beautiful-dnd';
import { Task as ITask } from '../logic/Task';
import Task from './Task';
import { GameContext } from './GameContext';
import { StatusMachine } from './Dashboard';
import { useSignals } from '@preact/signals-react/runtime';
import { twMerge } from 'tailwind-merge';

function Track({ items, id }: { items: ITask[]; id: string }) {
	useSignals();

	const { dragId$ } = GameContext.use();

	const fromId = dragId$.value;

	const enabled = fromId === id || StatusMachine[fromId]?.includes(id);

	return (
		<Droppable key={id} droppableId={id} isDropDisabled={!enabled}>
			{(provided, snapshot) => (
				<div className='flex flex-col gap-4 flex-1'>
					<div>{id}</div>

					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={twMerge(
							'bg-slate-200 rounded-md p-4 flex-1 item-start transition-all duration-100',
							fromId && !enabled && 'bg-red-400'
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
					</div>
				</div>
			)}
		</Droppable>
	);
}

export default Track;
