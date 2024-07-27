import { IconChartPie3, IconCloud, IconCurrencyDollar, IconFlask, IconPalette, IconShieldHalfFilled, IconTool } from '@tabler/icons-react';
import { ComponentType } from 'react';

export const resources = [
	// 'TypeScript',
	// 'JavaScript',
	// 'Java',
	// 'Swift',
	// 'Kotlin',
	// 'Python',
	// 'Rust',

	// 'Optimization',
	'Engineering',
	'Design',
	'Testing',
	'Security',
	// 'Cyber',
	'Cloud',
	'Marketing',
	'Data',
] as const;

export type Resource = (typeof resources)[number];

// export const resourcesByDomain: { [key in Domain]: Resource[] } = {
// 	backend: ['TypeScript', 'Security', 'Optimization', 'Engineering'],
// 	ui: ['Design', 'Testing', 'Security', 'Optimization', 'Engineering'],
// 	'dev-ops': ['Security', 'Cloud', 'Engineering'],
// 	marketing: [
// 		'Marketing',
// 	],
// 	qa: ['Testing'],
// 	analytics: ['Data'],
// 	security: ['Security'],
// };

export const ResourceDisplay: { [key in Resource]: { Icon: ComponentType, color: string } } = {
	Cloud: {
		Icon: IconCloud,
		color: 'blue',
	},

	Security: {
		Icon: IconShieldHalfFilled,
		color: 'blue',
	},

	Data: {
		Icon: IconChartPie3,
		color: 'purple',
	},

	Design: {
		Icon: IconPalette,
		color: 'magenta'
	},

	Engineering: {
		Icon: IconTool,
		color: 'orange',
	},

	Marketing: {
		Icon: IconCurrencyDollar,
		color: 'green',
	},

	Testing: {
		Icon: IconFlask,
		color: 'cyan'
	},



	// Optimization: {

	// }
}