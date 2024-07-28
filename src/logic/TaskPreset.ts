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
		return res.every(r => resources.includes(r));
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
		name: 'Something doesnt work',
		requirements: createStats({
			Engineering: 5,
		}),
	},
	{
		name: 'Demo Rejects',
		requirements: createStats({
			Engineering: 1,
		}),
	},
	{
		name: 'Error handling',
		requirements: createStats({
			Engineering: 3,
		}),
	},
	{
		name: 'User authentication',
		requirements: createStats({
			Engineering: 3,
		}),
	},
	{
		name: 'Database connection',
		requirements: createStats({
			Engineering: 3,
		}),
	},
	{
		name: 'Database connection',
		requirements: createStats({
			Engineering: 3,
		}),
	},
	{
		name: 'Implement security features',
		requirements: createStats({ Security: 5 }),
	},
	{
		name: 'Demo UI',
		requirements: createStats({ Design: 2 }),
	},
	{
		name: 'Prototyping',
		requirements: createStats({ Design: 3 }),
	},
	{
		name: 'Custom Theme',
		requirements: createStats({ Design: 3 }),
	},
	{
		name: 'Look & Feel',
		requirements: createStats({ Design: 4 }),
	},
	{
		name: 'Create wireframe',
		requirements: createStats({ Design: 2 }),
	},
	{
		name: 'Components Library',
		requirements: createStats({ Design: 3, Engineering: 4 }),
	},
	{
		name: 'Pixel perfect nit-picks',
		requirements: createStats({ Design: 1 }),
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
		name: 'Investor Demo',
		requirements: createStats({
			Marketing: 5,
			Design: 1,
			Engineering: 1,
		}),
	},
	{
		name: 'Sales Pitch',
		requirements: createStats({
			Marketing: 5,
		}),
	},
	{
		name: 'Rework the whole project',
		requirements: createStats({
			Engineering: 2,
		}),
	},
	{
		name: 'Cloud infra',
		requirements: createStats({
			Cloud: 2,
		}),
	},
	{
		name: 'Protect secret keys',
		requirements: createStats({
			Cloud: 2,
			Security: 2,
		}),
	},
	{
		name: 'Move existing code to cloud',
		requirements: createStats({
			Cloud: 5,
			Engineering: 5,
		}),
	},
	{
		name: 'Trend analysis',
		requirements: createStats({
			Data: 2,
		}),
	},
	{
		name: 'Pen-test rejects',
		requirements: createStats({
			Security: 2,
		}),
	},
	{
		name: 'Something went horribly wrong',
		requirements: createStats({
			Testing: 2,
			Engineering: 2,
			Marketing: 2,
			Security: 2,
			Design: 2,
			Cloud: 2,
		}),
	},
]