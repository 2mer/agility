import { Resource, ResourceDisplay } from '@/logic/Resource';
import { Stats as IStats } from '../logic/Stats';
import { Tooltip } from '@mantine/core';

export function Stat({
	value,
	resource,
	max,
}: {
	value: number;
	max?: number;
	resource: Resource;
}) {
	const { Icon, color } = ResourceDisplay[resource];

	return (
		<Tooltip label={resource}>
			<div
				className='flex items-center gap-1 p-1 rounded-md text-xs'
				style={{
					color,
					border: `2px solid currentColor`,
				}}
			>
				<Icon className='w-4 h-4' />
				<div className='font-mono font-bold'>
					{value}
					{max && `/${max}`}
				</div>
			</div>
		</Tooltip>
	);
}

function Stats({ stats, max }: { stats: IStats; max?: IStats }) {
	return (
		<div className='flex gap-2 flex-wrap'>
			{Object.entries(stats)
				.filter(([k, v]) => Boolean(v) || Boolean(max?.[k as Resource]))
				.map(([k, v]) => {
					return (
						<Stat
							value={v}
							resource={k as Resource}
							key={k}
							max={max?.[k as Resource]}
						/>
					);
				})}
		</div>
	);
}

export default Stats;
