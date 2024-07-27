import './App.css';

import { AppShell, MantineProvider } from '@mantine/core';
import Dashboard from './components/Dashboard';
import { GameContext } from './components/GameContext';
import { Router } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import { IconBolt } from '@tabler/icons-react';
import PauseButton from './components/PauseButton';
import { ModalsProvider } from '@mantine/modals';

function App() {
	return (
		<MantineProvider>
			<GameContext.Provider>
				<Router hook={useHashLocation}>
					<ModalsProvider>
						<AppShell header={{ height: 60 }} padding='md'>
							<AppShell.Header>
								<div className='h-full flex items-center gap-1 p-4'>
									<IconBolt
										color='#09b5a7'
										className='w-8 h-8'
									/>
									<div className='text-xl font-bold'>
										Agility
									</div>
									<div className='flex-1' />
									<PauseButton />
								</div>
							</AppShell.Header>

							<AppShell.Main
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<Dashboard />
							</AppShell.Main>
						</AppShell>
					</ModalsProvider>
				</Router>
			</GameContext.Provider>
		</MantineProvider>
	);
}

export default App;
