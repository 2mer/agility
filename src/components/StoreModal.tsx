import { useGameState } from '@/hooks/useGameState';
import { GameContext } from './GameContext';
import { ActionIcon, Button, Card } from '@mantine/core';
import { IconRefresh, IconX } from '@tabler/icons-react';
import { GlareCard } from './ui/glare-card';
import EmployeeAvatar from './EmployeeAvatar';
import Stats from './Stats';
import { AnimatePresence, motion } from 'framer-motion';
import { sounds } from '@/logic/sounds';
import { twMerge } from 'tailwind-merge';

function StoreModal() {
	const [state, update] = useGameState();
	const { game } = GameContext.use();

	const { storeEmployees, rerollCooldown, employees, maxEmployees } =
		state.world;

	const canBuy = employees.length < maxEmployees;

	return (
		<div className='flex flex-col items-center gap-10 p-10'>
			<div className='text-3xl'>Recruit Employees</div>
			{/* employee cards */}
			<div className='flex gap-5'>
				<AnimatePresence>
					{storeEmployees.map((e) => (
						<motion.div
							layout
							layoutId={e.id}
							key={e.id}
							className={twMerge(
								'flex',
								canBuy && 'cursor-pointer'
							)}
							animate={{ opacity: 1 }}
							initial={{ opacity: 0 }}
							exit={{ opacity: 0 }}
							onClick={() => {
								if (!canBuy) {
									sounds.tick.play();
									return;
								}

								update((state) => {
									state.world.storeEmployees.splice(
										state.world.storeEmployees.findIndex(
											(em) => em.id === e.id
										),
										1
									);
									state.world.employees.push(e);
								});

								sounds.taskComplete.play();
							}}
						>
							<GlareCard
								key={e.id}
								className={twMerge(!canBuy && 'opacity-50')}
							>
								<div className='flex flex-col gap-2 items-center p-10 justify-between h-full'>
									<div className='font-bold text-white'>
										{e.name}
									</div>

									<EmployeeAvatar employee={e} size='xl' />

									<Stats stats={e.stats} />
								</div>
							</GlareCard>
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			<div className='flex flex-col items-center gap-2'>
				{/* reroll */}
				<Button
					disabled={rerollCooldown > 0}
					leftSection={<IconRefresh />}
					onClick={() => {
						update((state) => {
							state.world.storeEmployees =
								game.generateShopEmployees();
							state.world.rerollCooldown = 5;
						});
						sounds.click.play();
					}}
				>
					Reroll
				</Button>
				{rerollCooldown > 0 && (
					<div className='text-sm text-slate-300'>
						Available in {rerollCooldown}d
					</div>
				)}
			</div>

			<Card shadow='md' withBorder radius='xl'>
				<div className='flex flex-col items-center gap-6'>
					<div className='text-xl'>Your Employees</div>

					<div className='flex items-center gap-6'>
						<AnimatePresence>
							{state.world.employees.map((e) => {
								return (
									<motion.div
										layout
										layoutId={e.id}
										animate={{ opacity: 1 }}
										initial={{ opacity: 0 }}
										exit={{ opacity: 0 }}
										key={e.id}
										className='flex relative'
									>
										<EmployeeAvatar
											employee={e}
											size='xl'
										/>

										<div className='flex absolute top-0 right-0'>
											<ActionIcon
												color='red'
												radius='xl'
												onClick={() => {
													update((state) => {
														state.world.employees.splice(
															state.world.employees.findIndex(
																(em) =>
																	em.id ===
																	e.id
															),
															1
														);
													});

													sounds.damage.play();
												}}
											>
												<IconX />
											</ActionIcon>
										</div>
									</motion.div>
								);
							})}
						</AnimatePresence>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default StoreModal;
