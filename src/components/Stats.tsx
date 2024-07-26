import { Stats as IStats } from '../logic/Stats';

function Stats({ stats }: { stats: IStats }) {
	return (
		<div className='flex gap-2 flex-wrap'>
			{Object.entries(stats)
				.filter(([, v]) => Boolean(v))
				.map(([k, v]) => {
					return (
						<div
							key={k}
							className='flex gap-2 bg-slate-200 p-1 rounded-md text-xs'
						>
							<div>{k}</div>
							<div>{v}</div>
						</div>
					);
				})}
		</div>
	);
}

export default Stats;
