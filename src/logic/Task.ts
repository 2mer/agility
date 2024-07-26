import { Stats } from "./Stats";

export type Task = {
	id: string;
	name: string;
	requirements: Stats;
	score: number;
	assignee?: string; // Employee id
};


