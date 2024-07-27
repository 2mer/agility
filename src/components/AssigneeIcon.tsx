import { useMemo } from 'react';
import { useGameState } from '../hooks/useGameState';
import { Avatar, AvatarProps, Popover } from '@mantine/core';
import Stats from './Stats';
import { useDisclosure } from '@mantine/hooks';

const AssigneeIcon = ({
	assignee,
	...rest
}: { assignee?: string } & AvatarProps) => {
	const [state] = useGameState();
	const a = useMemo(
		() => state.world.employees.find((e) => e.id === assignee),
		[state, assignee]
	);

	const [opened, { close, open }] = useDisclosure(false);

	if (!a) return;

	return (
		<Popover opened={opened} position='bottom' withArrow shadow='md'>
			<Popover.Dropdown>
				<div className='flex flex-col gap-2'>
					<div>{a.name}</div>
					<Stats stats={a.stats} />
				</div>
			</Popover.Dropdown>

			<Popover.Target>
				<Avatar
					color='cyan'
					radius='xl'
					onMouseEnter={open}
					onMouseLeave={close}
					{...rest}
				>
					{a.name
						.split(' ')
						.map((s) => s[0])
						.join('')
						.toUpperCase()}
				</Avatar>
			</Popover.Target>
		</Popover>
	);
};

export default AssigneeIcon;
