import { STORAGE_KEY, useGameState } from '@/hooks/useGameState';
import Stats from './Stats';
import { GlareCard } from './ui/glare-card';
import { Button } from '@mantine/core';
import { IconReload } from '@tabler/icons-react';

function GameLostScreen() {
	const [state] = useGameState();

	return (
		<div className='flex flex-col items-center gap-4'>
			<div className='text-2xl'>Game Over!</div>
			<div className='text-xl'>Your Score</div>

			<GlareCard>
				<div className='flex flex-col items-center h-full justify-center gap-2'>
					<div className='text-white text-2xl mb-8'>
						{state.world.name}
					</div>
					<div className='text-yellow-300 text-xl'>
						Sprint {state.world.level}
					</div>
					<Stats stats={state.world.score} />
				</div>
			</GlareCard>

			<Button
				leftSection={<IconReload />}
				onClick={() => {
					localStorage.removeItem(STORAGE_KEY);
					location.reload();
				}}
			>
				Restart
			</Button>
		</div>
	);
}

export default GameLostScreen;
