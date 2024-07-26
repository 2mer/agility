import { createStats, Stats, statsResources } from './Stats';
import { Resource } from './Resource';

export type BugPreset = {
	name: string;
	requirements: Stats;
	// effect: Effect, // TODO
}

// Returns a list of 
export function bugPresetsByResources(bugs: BugPreset[], resources: Resource[]) {
	return bugs.filter((preset) => {
		const presetResources = statsResources(preset.requirements);
		let counter = 0;
		for (const r in resources) if (r in presetResources) counter += 1;
		return counter == resources.length;
	});
}

export const allBugs = [
	{
		name: 'Undefined reference',
		requirements: createStats({ 'TypeScript': 5, 'QA Engineer': 3 }),
	},
	{
		name: 'Database connection timeout',
		requirements: createStats({ 'TypeScript': 4, 'Cloud Engineer': 3 }),
	},
	{
		name: 'Incorrect data format',
		requirements: createStats({ 'TypeScript': 4, 'Business Analyst': 2 }),
	},
	{
		name: 'Authentication failure',
		requirements: createStats({ 'Security Tester': 5, 'QA Engineer': 3 }),
	},
	{
		name: 'Memory leak',
		requirements: createStats({ 'Rust': 5, 'QA Engineer': 4 }),
	},
	{
		name: 'Concurrency issues',
		requirements: createStats({ 'Rust': 6, 'QA Engineer': 4 }),
	},
	{
		name: 'API endpoint not found',
		requirements: createStats({ 'TypeScript': 4, 'QA Engineer': 3 }),
	},
	{
		name: 'Data inconsistency',
		requirements: createStats({ 'Rust': 5, 'Data Analyst': 3 }),
	},
	{
		name: 'UI elements not displaying',
		requirements: createStats({ 'React': 5, 'UI Designer': 3 }),
	},
	{
		name: 'Broken link',
		requirements: createStats({ 'React': 3, 'UX Designer': 2 }),
	},
	{
		name: 'CSS not applied correctly',
		requirements: createStats({ 'UI Designer': 4 }),
	},
	{
		name: 'JavaScript error',
		requirements: createStats({ 'TypeScript': 5, 'QA Engineer': 3 }),
	},
	{
		name: 'Form validation not working',
		requirements: createStats({ 'React': 4, 'QA Engineer': 3 }),
	},
	{
		name: 'Slow performance',
		requirements: createStats({ 'React': 5, 'UX Designer': 3 }),
	},
	{
		name: 'Responsive design issues',
		requirements: createStats({ 'UI Designer': 4, 'UX Designer': 3 }),
	},
	{
		name: 'Image not loading',
		requirements: createStats({ 'React': 3, 'UI Designer': 2 }),
	},
	{
		name: 'CI/CD pipeline failure',
		requirements: createStats({ 'DevOps Engineer': 5, 'QA Engineer': 3 }),
	},
	{
		name: 'Deployment rollback issues',
		requirements: createStats({ 'Cloud Engineer': 5, 'DevOps Engineer': 4 }),
	},
	{
		name: 'Environment configuration mismatch',
		requirements: createStats({ 'DevOps Engineer': 4, 'TypeScript': 3 }),
	},
	{
		name: 'Monitoring alerts not triggering',
		requirements: createStats({ 'DevOps Engineer': 4, 'Cloud Engineer': 3 }),
	},
	{
		name: 'Backup restoration failure',
		requirements: createStats({ 'Cloud Engineer': 5, 'DevOps Engineer': 4 }),
	},
	{
		name: 'Security vulnerability detected',
		requirements: createStats({ 'Security Tester': 5, 'DevOps Engineer': 3 }),
	},
	{
		name: 'Load balancer configuration error',
		requirements: createStats({ 'DevOps Engineer': 4, 'Cloud Engineer': 4 }),
	},
	{
		name: 'Automated test suite failing',
		requirements: createStats({ 'DevOps Engineer': 5, 'QA Engineer': 4 }),
	}
];

