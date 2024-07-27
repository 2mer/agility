import { useHotkeys } from '@mantine/hooks';
import { GameContext } from './GameContext';
import { ActionIcon } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlayFilled } from '@tabler/icons-react';

function PauseButton() {
	const { game } = GameContext.use();

	useHotkeys([['Space', () => game.togglePauseState()]]);

	return (
		<ActionIcon
			onClick={() => {
				game.togglePauseState();
			}}
		>
			{game.isPaused() ? <IconPlayerPause /> : <IconPlayerPlayFilled />}
		</ActionIcon>
	);
}

export default PauseButton;
