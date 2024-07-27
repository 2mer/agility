import { createStats, Stats, statsResources } from './Stats';
import { Resource } from './Resource';

export type TaskPreset = {
	name: string;
	requirements: Stats;
};

export function taskPresetResources(preset: TaskPreset): Resource[] {
	return statsResources(preset.requirements);
}

export function chooseTaskPresetsByResources(
	presets: TaskPreset[],
	resources: Resource[],
	// intersectionSize: number | 'all'
) {
	// return presets.filter((preset) => {
	// 	const presetResources = statsResources(preset.requirements);
	// 	let counter = 0;
	// 	for (const r of resources) if (r in presetResources) counter += 1;

	// 	if (intersectionSize === 'all' && counter === resources.length) {
	// 		return true;
	// 	}
	// 	if (typeof intersectionSize === 'number' && counter >= intersectionSize)
	// 		return true;
	// 	return false;
	// });

	return presets.filter(preset => {
		const res = statsResources(preset.requirements);
		return resources.every(r => res.includes(r));
	})
}

// export const taskPresetWebApp: TaskPreset[] = [
// 	{
// 		name: 'Set up project structure',
// 		requirements: createStats({ Engineering: 2 }),
// 	},
// 	{
// 		name: 'Develop frontend',
// 		requirements: createStats({
// 			Engineering: 3,
// 		}),
// 	},
// 	{
// 		name: 'Implement security features',
// 		requirements: createStats({ Security: 5 }),
// 	},
// 	{
// 		name: 'Perform QA testing',
// 		requirements: createStats({ Testing: 6 }),
// 	},
// 	{
// 		name: 'Launch marketing campaign',
// 		requirements: createStats({
// 			Marketing: 5
// 		}),
// 	},
// 	{
// 		name: 'Rework the whole project',
// 		requirements: createStats({
// 			Engineering: 15,
// 		}),
// 	},
// ];

// export const taskPresetMobileApp: TaskPreset[] = [
// 	{
// 		name: 'Set up project structure',
// 		requirements: createStats({ Engineering: 5 }),
// 	},
// 	{
// 		name: 'Develop iOS app with Swift',
// 		requirements: createStats({
// 			Engineering: 5
// 		}),
// 	},
// 	{
// 		name: 'Develop Android app with Kotlin',
// 		requirements: createStats({
// 			Engineering: 5
// 		}),
// 	},
// 	{
// 		name: 'Implement security features',
// 		requirements: createStats({ Security: 5 }),
// 	},
// 	{
// 		name: 'Perform QA testing',
// 		requirements: createStats({ Testing: 6 }),
// 	},
// 	{
// 		name: 'Launch marketing campaign',
// 		requirements: createStats({
// 			Marketing: 5
// 		}),
// 	},
// ];

// export const taskPresetInternalTool: TaskPreset[] = [
// 	{
// 		name: 'Set up project structure',
// 		requirements: createStats({ Engineering: 3 }),
// 	},
// 	{
// 		name: 'Develop backend services',
// 		requirements: createStats({ Engineering: 5 }),
// 	},
// 	{
// 		name: 'Create internal UI',
// 		requirements: createStats({
// 			Engineering: 5
// 		}),
// 	},
// 	{
// 		name: 'Perform QA testing',
// 		requirements: createStats({ Testing: 5 }),
// 	},
// 	{
// 		name: 'Analyze performance data',
// 		requirements: createStats({ Data: 5 }),
// 	},
// ];

// export const taskPresetBackendService: TaskPreset[] = [
// 	{
// 		name: 'Set up project structure',
// 		requirements: createStats({ Engineering: 5 }),
// 	},
// 	{
// 		name: 'Develop backend services',
// 		requirements: createStats({ Engineering: 5, Security: 1 }),
// 	},
// 	{
// 		name: 'Implement security features',
// 		requirements: createStats({ Security: 5 }),
// 	},
// 	{
// 		name: 'Perform QA testing',
// 		requirements: createStats({ Testing: 5 }),
// 	},
// 	{
// 		name: 'Analyze performance data',
// 		requirements: createStats({ Data: 5 }),
// 	},
// ];

// export const allTaskPresets = [
// 	...taskPresetWebApp,
// 	...taskPresetMobileApp,
// 	...taskPresetInternalTool,
// 	...taskPresetBackendService,
// ];

export const allTaskPresets: TaskPreset[] = [
	{
		name: 'Set up project structure',
		requirements: createStats({ Engineering: 2 }),
	},
	{
		name: 'Develop frontend',
		requirements: createStats({
			Engineering: 3,
		}),
	},
	{
		name: 'Implement security features',
		requirements: createStats({ Security: 5 }),
	},
	{
		name: 'Perform QA testing',
		requirements: createStats({ Testing: 6 }),
	},
	{
		name: 'Launch marketing campaign',
		requirements: createStats({
			Marketing: 5
		}),
	},
	{
		name: 'Rework the whole project',
		requirements: createStats({
			Engineering: 15,
		}),
	},
]