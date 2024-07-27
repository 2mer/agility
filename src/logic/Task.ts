import { Stats } from "./Stats";

export type Task = {
	id: string;
	name: string;
	requirements: Stats;
	progress: Stats;
	assignee?: string; // Employee id
};


