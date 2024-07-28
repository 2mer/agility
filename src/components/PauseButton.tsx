import { useHotkeys } from '@mantine/hooks';
import { GameContext } from './GameContext';
import { ActionIcon } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlayFilled } from '@tabler/icons-react';

function PauseButton() {
	const { game } = GameContext.use();

	useHotkeys([['Space', () => game.togglePauseState()]]);

	const isPaused = game.isPaused();

	return (
		<ActionIcon
			onClick={() => {
				game.togglePauseState();
			}}
			color={isPaused ? 'orange' : 'blue'}
			data-tour-step='pause'
		>
			{isPaused ? <IconPlayerPause /> : <IconPlayerPlayFilled />}
		</ActionIcon>
	);
}

export default PauseButton;
