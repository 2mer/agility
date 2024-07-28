import { useGameState } from '../hooks/useGameState';
import { PropsWithChildren } from 'react';
import EmployeeAvatar from './EmployeeAvatar';
import { useSignals } from '@preact/signals-react/runtime';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
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
	IconTrash,
	IconUserPlus,
	IconUserX,
} from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { sounds } from '@/logic/sounds';

function TaskContextMenu({
	children,
	laneId,
	task,
}: PropsWithChildren<{ laneId: string; task: Task }>) {
	useSignals();

	const [state, update] = useGameState();
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
							<EmployeeAvatar assignee={foundAssignee.id} />

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

				<ContextMenuSub>
					<ContextMenuSubTrigger>Assignee</ContextMenuSubTrigger>

					<ContextMenuSubContent className='w-48'>
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
						<ContextMenuItem
							className='gap-1'
							onClick={() => {
								update((state) => {
									const t = state.world.lanes[laneId].find(
										(t) => t.id === task.id
									);
									if (!t) return;

									t.assignee = undefined;
								});
							}}
						>
							<IconUserX color='red' />
							Unassign
						</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>

				<ContextMenuSeparator />

				<ContextMenuSub>
					<ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>

					<ContextMenuSubContent className='w-48'>
						<ContextMenuItem className='gap-1'>
							<IconArrowUp />
							top of lane
						</ContextMenuItem>
						<ContextMenuItem className='gap-1'>
							<IconArrowDown />
							bottom of lane
						</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>

				{laneId !== 'done' && (
					<>
						<ContextMenuSeparator />
						<ContextMenuItem
							className='gap-1'
							onClick={() => {
								update((state) => {
									const i = state.world.lanes[
										laneId
									].findIndex((t) => t.id === task.id);

									if (i > -1) {
										state.world.lanes[laneId].splice(i, 1);
									}
								});

								sounds.damage.play();
							}}
						>
							<IconTrash color='red' />
							Delete
						</ContextMenuItem>
					</>
				)}
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
							<EmployeeAvatar assignee={e.id} size='sm' />
							{e.name}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
};

export default TaskContextMenu;
