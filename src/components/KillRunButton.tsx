import { ActionIcon } from '@mantine/core';
import { GameContext } from './GameContext';
import { IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';

function KillRunButton() {
	const { game } = GameContext.use();

	return (
		<ActionIcon
			color='red'
			onClick={() =>
				modals.openConfirmModal({
					title: 'Forfeit run?',
					labels: { confirm: 'Forfeit', cancel: 'Cancel' },
					confirmProps: { color: 'red' },
					onConfirm: () => {
						game.kill();
					},
				})
			}
		>
			<IconTrash />
		</ActionIcon>
	);
}

export default KillRunButton;
