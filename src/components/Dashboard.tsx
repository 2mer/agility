import { ActionIcon, AvatarGroup, Button, Divider } from '@mantine/core';
import { useGameState } from '../hooks/useGameState';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { GameContext } from './GameContext';
import Track from './Track';
import { DragDropContext } from 'react-beautiful-dnd';
import AssigneeIcon from './AssigneeIcon';

const reorder = (list: any, startIndex: any, endIndex: any) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
	source: any,
	destination: any,
	droppableSource: any,
	droppableDestination: any
) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	// @ts-ignore
	result[droppableSource.droppableId] = sourceClone;
	// @ts-ignore
	result[droppableDestination.droppableId] = destClone;

	return result;
};

export const StatusMachine = {
	todo: ['inProgress'],
	inProgress: ['todo'],
	onHold: ['todo'],
};

function Dashboard() {
	const [state, update] = useGameState();
	const { game, taskGenerator, employeeGenerator, dragId$ } =
		GameContext.use();

	function onDragEnd(result: any) {
		const { source, destination } = result;

		dragId$.value = undefined;

		// dropped outside the list
		if (!destination) {
			return;
		}
		const sInd = source.droppableId;
		const dInd = destination.droppableId;

		if (sInd === dInd) {
			const items = reorder(
				state.world.lanes[sInd],
				source.index,
				destination.index
			);

			update((state) => {
				state.world.lanes[sInd] = items as any[];
			});
		} else {
			const result = move(
				state.world.lanes[sInd],
				state.world.lanes[dInd],
				source,
				destination
			);

			update((state) => {
				// @ts-ignore
				state.world.lanes[sInd] = result[sInd] as any[];
				// @ts-ignore
				state.world.lanes[dInd] = result[dInd] as any[];
			});
		}
	}

	return (
		<div className='flex flex-col gap-4 flex-1'>
			<div className='flex gap-4'>
				<div>required: {game.getThresholdScore(state.world.level)}</div>
				<div>
					remaining: {state.world.sprintDuration - state.world.time}
				</div>
				<div className='flex-1' />
				<div>score: {state.world.score}</div>

				{/* pause/unpause */}
				<ActionIcon
					onClick={() => {
						if (state.paused) {
							game.start();
						} else {
							game.pause();
						}
					}}
				>
					<IconPlayerPlayFilled />
				</ActionIcon>
			</div>

			<Divider />

			<div className='flex gap-4'>
				<div>
					<AvatarGroup>
						{!state.world.employees.length && (
							<Button>Recruite employees</Button>
						)}
						{state.world.employees.map((e) => (
							<AssigneeIcon assignee={e.id} key={e.id} />
						))}
					</AvatarGroup>
				</div>

				{/* generate tasks */}
				<ActionIcon
					color='grape'
					onClick={() => {
						const tasks = Array.from({ length: 3 }, (_) =>
							taskGenerator.generate()
						);

						update((state) => {
							state.world.lanes.todo.push(...tasks);
						});
					}}
				>
					<IconPlayerPlayFilled />
				</ActionIcon>

				{/* generate employees */}
				<ActionIcon
					color='green'
					onClick={() => {
						const employees = Array.from({ length: 3 }, (_) =>
							employeeGenerator.nextEmployee()
						);

						update((state) => {
							state.world.employees.push(...employees);
						});
					}}
				>
					<IconPlayerPlayFilled />
				</ActionIcon>

				<div className='flex-1' />

				<div>Managing: {state.world.project.domains.join(', ')}</div>
			</div>
			<Divider />

			{/* tracks */}
			<DragDropContext
				onDragEnd={onDragEnd}
				onDragStart={(drag, provided) => {
					console.log({ drag, s: drag.source.droppableId });
					dragId$.value = drag.source.droppableId;
				}}
			>
				<div className='flex gap-4 flex-1'>
					{Object.entries(state.world.lanes).map(
						([laneId, tasks]) => {
							return (
								<Track items={tasks} id={laneId} key={laneId} />
							);
						}
					)}
				</div>
			</DragDropContext>
		</div>
	);
}

export default Dashboard;
