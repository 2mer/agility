import { useMemo } from 'react';
import { useGameState } from '../hooks/useGameState';
import { Avatar } from '@mantine/core';

function AssigneeIcon({ assignee }: { assignee?: string }) {
	const [state] = useGameState();
	const a = useMemo(
		() => state.world.employees.find((e) => e.id === assignee),
		[state, assignee]
	);

	if (!a) return;

	return (
		<Avatar color='cyan' radius='xl'>
			{a.name
				.split(' ')
				.map((s) => s[0])
				.join('')
				.toUpperCase()}
		</Avatar>
	);
}

export default AssigneeIcon;
