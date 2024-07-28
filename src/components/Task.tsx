import { Draggable } from 'react-beautiful-dnd';
import { Card } from '@mantine/core';
import { Task as ITask } from '../logic/Task';
import Stats from './Stats';
import EmployeeAvatar from './EmployeeAvatar';
import TaskContextMenu from './TaskContextMenu';
import { useSignal } from '@preact/signals-react';
import { useGameState } from '@/hooks/useGameState';
import { motion } from 'framer-motion';
import { GameContext } from './GameContext';
import { useSignals } from '@preact/signals-react/runtime';

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
	useSignals();
	const [, update] = useGameState();
	const { dragId$ } = GameContext.use();

	const isDragging = Boolean(dragId$.value);

	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided, snapshot) => (
				<motion.div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className='p-1'
					// {...(!isDragging && {
					// 	layout: true,
					// 	layoutId: `motion-` + task.id,
					// })}
				>
					<TaskContextMenu laneId={laneId} task={task}>
						<Card
							withBorder
							shadow={snapshot.isDragging ? 'md' : undefined}
							data-tour-step='task-resources'
						>
							<div className='flex flex-col items-start gap-4'>
								<div className='text-start'>{task.name}</div>
								<div className='flex gap-2 self-stretch items-end'>
									<Stats
										stats={task.progress}
										max={task.requirements}
									/>
									<div className='ml-auto'>
										<EmployeeAvatar
											assignee={task.assignee}
											size='sm'
										/>
									</div>
								</div>
							</div>
						</Card>
					</TaskContextMenu>
				</motion.div>
			)}
		</Draggable>
	);
}

export default Task;
