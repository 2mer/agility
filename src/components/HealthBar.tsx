import { useGameState } from '@/hooks/useGameState';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

function HealthBar() {
	const [state] = useGameState();

	const { health, maxHealth } = state.world;

	return (
		<div className='flex text-red-500' data-tour-step='health'>
			{Array.from({ length: maxHealth }, (_, i) => {
				const isFilled = i + 1 <= health;

				return isFilled ? (
					<IconHeartFilled key={i} />
				) : (
					<IconHeart key={i} />
				);
			})}
		</div>
	);
}

export default HealthBar;
