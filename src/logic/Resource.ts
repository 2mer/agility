import { Domain } from './Domain';

export const resources = [
	// languages - backend
	'TypeScript',
	// languages - IOS
	'Swift',
	// languages - Android
	'Kotlin',
	// langauges - analytics
	'Python',
	// langauges - systems
	'Rust',
	// UI frameworks
	'React',
	// design
	'UX Designer',
	'UI Designer',
	// qa
	'QA Engineer',
	// security
	'Security Tester',
	// Dev ops
	'DevOps Engineer',
	'Cloud Engineer',
	// market
	'Marketing Specialist',
	'Sales Manager',
	'Social Media Manager',
	// analytics
	'Business Analyst',
	'Data Analyst',
] as const;

export type Resource = (typeof resources)[number];

export const resourcesByDomain: { [key in Domain]: Resource[] } = {
	backend: ['TypeScript', 'Security Tester'],
	ui: ['UX Designer', 'UI Designer', 'React'],
	'dev-ops': ['DevOps Engineer', 'Cloud Engineer'],
	marketing: [
		'Marketing Specialist',
		'Sales Manager',
		'Social Media Manager',
	],
	qa: ['QA Engineer'],
	analytics: ['Business Analyst', 'Data Analyst'],
	security: ['Security Tester'],
};
