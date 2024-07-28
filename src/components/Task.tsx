import { Draggable } from 'react-beautiful-dnd';
import { Card } from '@mantine/core';
import { Task as ITask } from '../logic/Task';
import Stats from './Stats';
import EmployeeAvatar from './EmployeeAvatar';
import TaskContextMenu from './TaskContextMenu';
import { motion } from 'framer-motion';
import { useSignals } from '@preact/signals-react/runtime';

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
	// const [, update] = useGameState();
	// const { dragId$ } = GameContext.use();

	// const isDragging = Boolean(dragId$.value);

	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided, snapshot) => (
				<motion.div
					ref={provided.innerRef as any}
					{...(provided.draggableProps as any)}
					{...(provided.dragHandleProps as any)}
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
