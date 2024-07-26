import { Menu, TextInput } from '@mantine/core';
import { useGameState } from '../hooks/useGameState';
import { PropsWithChildren, useMemo, useState } from 'react';
import AssigneeIcon from './AssigneeIcon';
import { Signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
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

function AssignMenu({
	children,
	onSelect,
}: PropsWithChildren<{ onSelect: (assignee: Employee) => void }>) {
	useSignals();

	const [state] = useGameState();

	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>

			<ContextMenuContent className='w-64'>
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
								>
									{e.name}
									{/* <AssigneeIcon assignee={e.id} /> */}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</ContextMenuContent>
		</ContextMenu>
	);
}

export default AssignMenu;
