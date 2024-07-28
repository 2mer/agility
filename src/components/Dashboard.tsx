import { Avatar } from '@mantine/core';
import { useGameState } from '../hooks/useGameState';
import { IconClock, IconSettings } from '@tabler/icons-react';
import { GameContext } from './GameContext';
import Track from './Track';
import { DragDropContext } from 'react-beautiful-dnd';
import EmployeeAvatar from './EmployeeAvatar';
import Stats from './Stats';
import { PlusIcon } from 'lucide-react';
import { modals } from '@mantine/modals';
import StoreModal from './StoreModal';
import NewGameScreen from './NewGameScreen';
import GameLostScreen from './GameLostScreen';
import Tour from 'reactour';
import { sounds } from '@/logic/sounds';

const tourSteps: { content: string; selector: string }[] = [
	{
		content:
			'Welcome to your board! Dont worry the game is paused! you can pause/unpause at any moment by clicking this toggle button or via pressing the spacebar',
		selector: '[data-tour-step="pause"]',
	},
	{
		content:
			'The game is split to sprints, each sprint has a resource goal',
		selector: '[data-tour-step="sprint-goal"]',
	},
	{
		content:
			'You amass resources by completing tasks, each task requires effort to be made in its specialization domains',
		selector: '[data-tour-step="task-resources"]',
	},
	{
		content:
			'Assign workers to tasks (via right clicking a task) in order to complete them, users have speciality in different fields, the speciality indicates how much effort is added to the task at the end of a sprint day',
		selector: '[data-tour-step="employees"]',
	},
	{
		content:
			'Employees automatically pull assigned tasks from the backlog as long as they are assigned to them',
		selector: '[data-tour-step="employees-todo"]',
	},
	{
		content:
			'When the sprint ends without enough resources, you stay on the same sprint, and your health is deducted by one point - the game ends at 0 health points. Good luck!',
		selector: '[data-tour-step="health"]',
	},
];

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
	todo: ['inProgress', 'delete'],
	inProgress: ['todo', 'delete'],
	onHold: ['todo', 'delete'],
};

function Dashboard() {
	const [state, update] = useGameState();
	const { game, dragId$ } = GameContext.use();

	const isStarted = game.isStarted();

	function onDragEnd(result: any) {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			dragId$.value = undefined;
			return;
		}
		const sInd = source.droppableId;
		const dInd = destination.droppableId;

		if (dInd === 'delete') {
			update((state) => {
				state.world.lanes[sInd].splice(source.index, 1);
			});
			sounds.damage.play();
			return;
		}

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
		dragId$.value = undefined;
	}

	if (!isStarted) return <NewGameScreen />;
	if (game.isDead()) return <GameLostScreen />;

	const employeeRem = state.world.maxEmployees - state.world.employees.length;

	return (
		<div className='flex flex-col gap-4 flex-1 w-full h-full pt-10 pb-10'>
			<Tour
				steps={tourSteps}
				isOpen={state.onboarding}
				onRequestClose={() => {
					update((state) => {
						state.onboarding = false;
					});
				}}
			/>
			<div className='flex gap-4 items-center'>
				<div
					className='flex gap-4 items-center'
					data-tour-step='sprint-goal'
				>
					<div className='flex text-lg font-bold justify-self-end'>
						Sprint {state.world.level}
					</div>
					<Stats
						stats={state.world.score}
						max={state.world.threshold}
					/>
					<div className='flex gap-2 items-center bg-slate-200 p-1 rounded-full text-sm'>
						<IconClock />
						<div className='font-bold'>
							{state.world.sprintDuration - state.world.time}d
						</div>
						<div className='mr-2'>until sprint ends</div>
					</div>
				</div>

				<div className='flex-1' />

				<div className='flex gap-1' data-tour-step='employees'>
					{Array.from({
						length: Math.max(0, employeeRem),
					}).map((_, i) => (
						<Avatar
							key={i}
							color='gray'
							className='cursor-pointer'
							onClick={() => {
								modals.open({
									children: <StoreModal />,
									fullScreen: true,
								});
							}}
						>
							<PlusIcon />
						</Avatar>
					))}

					{employeeRem <= 0 && (
						<Avatar
							color='gray'
							className='cursor-pointer'
							onClick={() => {
								modals.open({
									children: <StoreModal />,
									fullScreen: true,
								});
							}}
						>
							<IconSettings />
						</Avatar>
					)}
					{state.world.employees.map((e) => (
						<EmployeeAvatar assignee={e.id} key={e.id} />
					))}
				</div>
			</div>

			{/* <Divider /> */}
			<div />

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
