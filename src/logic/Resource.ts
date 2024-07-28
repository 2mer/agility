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

export const ResourceDisplay: { [key in Resource]: { Icon: ComponentType<{ className?: string }>, color: string } } = {
	Cloud: {
		Icon: IconCloud,
		color: '#edcf26',
	},

	Security: {
		Icon: IconShieldHalfFilled,
		color: '#4287f5',
	},

	Data: {
		Icon: IconChartPie3,
		color: '#953af0',
	},

	Design: {
		Icon: IconPalette,
		color: '#eb31bc'
	},

	Engineering: {
		Icon: IconTool,
		color: '#eb9731',
	},

	Marketing: {
		Icon: IconCurrencyDollar,
		color: '#2adb44',
	},

	Testing: {
		Icon: IconFlask,
		color: '#29d6cb'
	},



	// Optimization: {

	// }
}