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
	intersectionSize: number | 'all'
) {
	return presets.filter((preset) => {
		const presetResources = statsResources(preset.requirements);
		let counter = 0;
		for (const r in resources) if (r in presetResources) counter += 1;

		if (intersectionSize == 'all' && counter == resources.length) {
			return true;
		}
		if (typeof intersectionSize === 'number' && counter >= intersectionSize)
			return true;
		return false;
	});
}

export const taskPresetWebApp: TaskPreset[] = [
	{
		name: 'Set up project structure',
		requirements: createStats({ TypeScript: 5, 'DevOps Engineer': 3 }),
	},
	{
		name: 'Develop frontend with React',
		requirements: createStats({
			React: 8,
			'UX Designer': 3,
			'UI Designer': 3,
		}),
	},
	{
		name: 'Implement security features',
		requirements: createStats({ 'Security Tester': 5 }),
	},
	{
		name: 'Perform QA testing',
		requirements: createStats({ 'QA Engineer': 6 }),
	},
	{
		name: 'Launch marketing campaign',
		requirements: createStats({
			'Marketing Specialist': 4,
			'Sales Manager': 2,
			'Social Media Manager': 3,
		}),
	},
];

export const taskPresetMobileApp: TaskPreset[] = [
	{
		name: 'Set up project structure',
		requirements: createStats({ TypeScript: 5, 'DevOps Engineer': 3 }),
	},
	{
		name: 'Develop iOS app with Swift',
		requirements: createStats({
			Swift: 8,
			'UX Designer': 3,
			'UI Designer': 3,
		}),
	},
	{
		name: 'Develop Android app with Kotlin',
		requirements: createStats({
			Kotlin: 8,
			'UX Designer': 3,
			'UI Designer': 3,
		}),
	},
	{
		name: 'Implement security features',
		requirements: createStats({ 'Security Tester': 5 }),
	},
	{
		name: 'Perform QA testing',
		requirements: createStats({ 'QA Engineer': 6 }),
	},
	{
		name: 'Launch marketing campaign',
		requirements: createStats({
			'Marketing Specialist': 4,
			'Sales Manager': 2,
			'Social Media Manager': 3,
		}),
	},
];

export const taskPresetInternalTool: TaskPreset[] = [
	{
		name: 'Set up project structure',
		requirements: createStats({ TypeScript: 5, 'DevOps Engineer': 3 }),
	},
	{
		name: 'Develop backend services',
		requirements: createStats({ Rust: 8 }),
	},
	{
		name: 'Create internal UI',
		requirements: createStats({
			React: 6,
			'UX Designer': 2,
			'UI Designer': 2,
		}),
	},
	{
		name: 'Perform QA testing',
		requirements: createStats({ 'QA Engineer': 5 }),
	},
	{
		name: 'Analyze performance data',
		requirements: createStats({ 'Business Analyst': 4, 'Data Analyst': 4 }),
	},
];

export const taskPresetBackendService: TaskPreset[] = [
	{
		name: 'Set up project structure',
		requirements: createStats({ TypeScript: 5, 'DevOps Engineer': 3 }),
	},
	{
		name: 'Develop backend services',
		requirements: createStats({ Rust: 8 }),
	},
	{
		name: 'Implement security features',
		requirements: createStats({ 'Security Tester': 5 }),
	},
	{
		name: 'Perform QA testing',
		requirements: createStats({ 'QA Engineer': 6 }),
	},
	{
		name: 'Analyze performance data',
		requirements: createStats({ 'Business Analyst': 4, 'Data Analyst': 4 }),
	},
];

export const commonTaskPresets = {
	taskPresetWebApp,
	taskPresetMobileApp,
	taskPresetInternalTool,
	taskPresetBackendService,
};

export const allTaskPresets = [
	...taskPresetWebApp,
	...taskPresetMobileApp,
	...taskPresetInternalTool,
	...taskPresetBackendService,
];