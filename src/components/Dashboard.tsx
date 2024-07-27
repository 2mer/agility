import {
	ActionIcon,
	AvatarGroup,
	Button,
	Card,
	Divider,
	Popover,
	PopoverTarget,
	Tooltip,
} from '@mantine/core';
import { useGameState } from '../hooks/useGameState';
import {
	IconClock,
	IconPlayerPause,
	IconPlayerPlayFilled,
} from '@tabler/icons-react';
import { GameContext } from './GameContext';
import Track from './Track';
import { DragDropContext } from 'react-beautiful-dnd';
import AssigneeIcon from './AssigneeIcon';
import Stats from './Stats';
import { useHotkeys } from '@mantine/hooks';

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
	const { game, dragId$ } = GameContext.use();

	const isStarted = game.isStarted();

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

	if (!isStarted)
		return (
			<Card withBorder shadow='md' className='self-center'>
				<div className='flex flex-col gap-4 items-center'>
					<div>Welcome to agility!</div>
					<div>
						Manage a team under a slew of incoming demands, will you
						handle the stress?
					</div>

					<Button color='green' onClick={() => game.startGame()}>
						Start new game
					</Button>
				</div>
			</Card>
		);

	return (
		<div className='flex flex-col gap-4 flex-1'>
			<div className='flex gap-4 items-center'>
				<div className='flex text-lg font-bold justify-self-end'>
					Goal
				</div>
				<Stats stats={state.world.score} max={state.world.threshold} />
				<div className='flex gap-2 items-center bg-slate-200 p-1 rounded-full text-sm'>
					<IconClock />
					<div className='font-bold'>
						{state.world.sprintDuration - state.world.time}d
					</div>
					<div className='mr-2'>until sprint ends</div>
				</div>

				<div className='flex-1' />

				<div className='flex gap-1'>
					{state.world.employees.map((e) => (
						<AssigneeIcon assignee={e.id} key={e.id} />
					))}
				</div>
			</div>

			<Divider />

			<div className='flex gap-4 items-center'>
				{/* generate tasks */}
				<ActionIcon
					color='grape'
					onClick={() => {
						const tasks = Array.from({ length: 3 }, (_) =>
							game.taskGenerator.generate()
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
							game.employeeGenerator.nextEmployee()
						);

						update((state) => {
							state.world.employees.push(...employees);
						});
					}}
				>
					<IconPlayerPlayFilled />
				</ActionIcon>

				<div className='flex-1' />
			</div>
			<Divider />

			{/* tracks */}
			<DragDropContext
				onDragEnd={onDragEnd}
				onDragStart={(drag, provided) => {
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
