import './App.css';

import { AppShell, MantineProvider } from '@mantine/core';
import Dashboard from './components/Dashboard';
import { GameContext } from './components/GameContext';
import { Router } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import { IconBolt } from '@tabler/icons-react';
import PauseButton from './components/PauseButton';
import { ModalsProvider } from '@mantine/modals';
import HealthBar from './components/HealthBar';
import { PropsWithChildren } from 'react';
import KillRunButton from './components/KillRunButton';

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
									<div className='flex gap-2 text-slate-400 items-center'>
										<div className='text-sm'>
											Made by{' '}
											<span className='font-bold'>
												Tomer Atar
											</span>{' '}
											and{' '}
											<span className='font-bold'>
												Roy Varon
											</span>
										</div>
									</div>
									<div className='flex-1' />
									<Actions>
										<div className='flex p-4'>
											<HealthBar />
										</div>
										<PauseButton />
										<KillRunButton />
									</Actions>
								</div>
							</AppShell.Header>
							{/* 
							<AppShell.Main
								style={{
									display: 'flex',
									flexDirection: 'column',
									width: '100vw',
									height: '100vh',
								}}
							>
							</AppShell.Main> */}
							<Dashboard />
						</AppShell>
					</ModalsProvider>
				</Router>
			</GameContext.Provider>
		</MantineProvider>
	);
}

const Actions = ({ children }: PropsWithChildren<{}>) => {
	const { game } = GameContext.use();
	const available = !game.isDead() && game.isStarted();
	if (!available) return null;

	return <>{children}</>;
};

export default App;
