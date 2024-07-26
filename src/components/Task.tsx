import { Draggable } from 'react-beautiful-dnd';
import { Card } from '@mantine/core';
import { Task as ITask } from '../logic/Task';
import Stats from './Stats';
import AssigneeIcon from './AssigneeIcon';
import AssignMenu from './AssignMenu';
import { useSignal } from '@preact/signals-react';
import { useGameState } from '@/hooks/useGameState';

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : 'grey',

	// styles we need to apply on draggables
	...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: 250,
});

function Task({
	task,
	index,
	laneId,
}: {
	task: ITask;
	index: number;
	laneId: string;
}) {
	const [, update] = useGameState();

	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className='p-1'
				>
					<AssignMenu
						onSelect={(e) =>
							update((state) => {
								const t = state.world.lanes[laneId].find(
									(t) => t.id === task.id
								);
								if (!t) return;

								t.assignee = e.id;
							})
						}
					>
						<Card
							withBorder
							shadow={snapshot.isDragging ? 'md' : undefined}
						>
							<div className='flex flex-col items-start gap-4'>
								<div className='text-start'>
									{task.name} - {task.score}
								</div>
								<div className='flex gap-2 self-stretch items-end'>
									<Stats stats={task.requirements} />
									<div className='ml-auto'>
										<AssigneeIcon
											assignee={task.assignee}
										/>
									</div>
								</div>
							</div>
						</Card>
					</AssignMenu>
				</div>
			)}
		</Draggable>
	);
}

export default Task;
