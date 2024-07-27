import { useGameState } from '../hooks/useGameState';
import { PropsWithChildren } from 'react';
import AssigneeIcon from './AssigneeIcon';
import { useSignals } from '@preact/signals-react/runtime';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from './ui/context-menu';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from './ui/command';
import { Employee } from '@/logic/Employee';
import { Task } from '@/logic/Task';
import {
	IconArrowDown,
	IconArrowUp,
	IconUserPlus,
	IconUserX,
} from '@tabler/icons-react';
import { modals } from '@mantine/modals';

function TaskContextMenu({
	children,
	laneId,
	task,
}: PropsWithChildren<{ laneId: string; task: Task }>) {
	useSignals();

	const [state] = useGameState();
	// const [open, setOpen] = useState(false);

	const foundAssignee = state.world.employees.find(
		(e) => e.id === task.assignee
	);

	return (
		<ContextMenu modal={false}>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>

			<ContextMenuContent className='w-64'>
				{foundAssignee && (
					<>
						<div className='flex gap-4 items-center p-2'>
							<AssigneeIcon assignee={foundAssignee.id} />

							<div className='flex flex-col'>
								<div className='text-xs text-slate-400'>
									Assigned to
								</div>
								<div className='text-lg'>
									{foundAssignee.name}
								</div>
							</div>
						</div>

						<ContextMenuSeparator />
					</>
				)}

				<ContextMenuItem
					className='gap-1'
					onClick={() => {
						modals.open({
							title: 'Assign',
							children: (
								<Assign
									laneId={laneId}
									task={task}
									close={() => modals.closeAll()}
								/>
							),
						});
					}}
				>
					<IconUserPlus />
					Assign
				</ContextMenuItem>
				<ContextMenuItem className='gap-1'>
					<IconUserX color='red' />
					Unassign
				</ContextMenuItem>

				<ContextMenuSeparator />

				<ContextMenuItem className='gap-1'>
					<IconArrowUp />
					Move to the top of the lane
				</ContextMenuItem>
				<ContextMenuItem className='gap-1'>
					<IconArrowDown />
					Move to the bottom of the lane
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}

const Assign = ({
	laneId,
	task,
	close,
}: {
	task: Task;
	laneId: string;
	close: () => void;
}) => {
	const [state, update] = useGameState();

	function onSelect(e: Employee) {
		update((state) => {
			const t = state.world.lanes[laneId].find((t) => t.id === task.id);
			if (!t) return;

			t.assignee = e.id;
		});

		close();
	}

	return (
		<Command>
			<CommandInput placeholder='Assign to...' autoFocus />
			<CommandEmpty>No employee found</CommandEmpty>
			<CommandList>
				<CommandGroup>
					{state.world.employees.map((e) => (
						<CommandItem
							key={e.id}
							value={e.name}
							onSelect={() => {
								onSelect(e);
							}}
							disabled={false}
							className='gap-2'
						>
							<AssigneeIcon assignee={e.id} size='sm' />
							{e.name}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
};

export default TaskContextMenu;
