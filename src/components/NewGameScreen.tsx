import { Button, Card, Divider, TextInput } from '@mantine/core';
import { GameContext } from './GameContext';
import { useState } from 'react';

function NewGameScreen() {
	const { game } = GameContext.use();
	const [name, setName] = useState('');

	return (
		<div className='mt-20 flex justify-center'>
			<Card withBorder shadow='md' className='self-center'>
				<div className='flex flex-col gap-4 items-center'>
					<div className='text-3xl font-bold'>
						Welcome to agility!
					</div>
					<div className='text-slate-500'>
						Created by Tomer Atar and Roy Varon for trijam #280
					</div>

					<div>incremental team+resource management game</div>

					<Divider flex={1} />

					<TextInput
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Your name...'
					/>

					<Button
						disabled={!name}
						color='green'
						onClick={() => game.startGame({ name })}
					>
						Start new game
					</Button>
				</div>
			</Card>
		</div>
	);
}

export default NewGameScreen;
