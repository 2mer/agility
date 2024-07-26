import './App.css';

import { AppShell, MantineProvider } from '@mantine/core';
import Dashboard from './components/Dashboard';
import { GameContext } from './components/GameContext';
import { Router } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

function App() {
	return (
		<MantineProvider>
			<GameContext.Provider>
				<Router hook={useHashLocation}>
					<AppShell header={{ height: 60 }} padding='md'>
						<AppShell.Header>
							<div>Logo</div>
						</AppShell.Header>

						<AppShell.Main
							style={{ display: 'flex', flexDirection: 'column' }}
						>
							<Dashboard />
						</AppShell.Main>
					</AppShell>
				</Router>
			</GameContext.Provider>
		</MantineProvider>
	);
}

export default App;
