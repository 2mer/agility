import { useMemo } from 'react';
import { useGameState } from '../hooks/useGameState';
import {
	Avatar,
	AvatarProps,
	DefaultMantineColor,
	Popover,
	useMantineTheme,
} from '@mantine/core';
import Stats from './Stats';
import { useDisclosure } from '@mantine/hooks';
import { Employee } from '@/logic/Employee';

function hashCode(str: string) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

const palette: DefaultMantineColor[] = [
	'blue',
	'cyan',
	'grape',
	'green',
	'indigo',
	'lime',
	'orange',
	'pink',
	'red',
	'teal',
	'violet',
	'yellow',
];

function getColorFromPalette(name: string) {
	const hash = hashCode(name);
	const index = Math.abs(hash) % palette.length;
	return palette[index];
}

const EmployeeAvatar = ({
	assignee,
	employee = undefined,
	...rest
}: { assignee?: string; employee?: Employee } & AvatarProps) => {
	const [state] = useGameState();
	const a = useMemo(() => {
		return employee || state.world.employees.find((e) => e.id === assignee);
	}, [state?.world?.employees, assignee, employee]);

	const [opened, { close, open }] = useDisclosure(false);
	const color = useMemo(() => a && getColorFromPalette(a?.name), [a]);
	const theme = useMantineTheme();

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
					color={color}
					radius='xl'
					onMouseEnter={open}
					onMouseLeave={close}
					style={{
						border: '2px solid ' + theme.colors[color as any][5],
					}}
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

export default EmployeeAvatar;
