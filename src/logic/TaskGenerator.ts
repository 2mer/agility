import { Task } from "./Task";
import { Resource } from "./Resource";
import { TaskPreset, chooseTaskPresetsByResources, allTaskPresets } from "./TaskPreset";
import { v4 as uuidv4 } from 'uuid';
import { randItem } from "./rand";
import { allBugs, BugPreset, bugPresetsByResources } from './BugPreset';
import { Project, projectResources } from './Project';

export type TaskGeneratorPreset = {
	tasks: TaskPreset[],
	bugs: BugPreset[],
	scoreCalculator: (taskPreset: TaskPreset) => number
}

export class TaskGenerator {
	private preset: TaskGeneratorPreset;

	constructor(preset: TaskGeneratorPreset) {
		this.preset = preset;
	}

	generate(): Task {
		const task = randItem(this.preset.tasks);
		const score = this.preset.scoreCalculator(task);
		return {
			id: uuidv4(),
			score,
			...task
		};
	}
}


export function taskGeneratorByProject(project: Project) {
	if (project.domains.length === 0)
		console.error("project has no domains");

	const r = projectResources(project);
	return taskGeneratorByResources(r)
}

function sumStatScores(taskPreset: TaskPreset) {
	let sum = 0;
	for (const v of Object.values(taskPreset.requirements))
		sum += v;
	return sum
}

export function taskGeneratorByResources(resources: Resource[]) {
	if (resources.length === 0)
		console.error("no resources");

	return new TaskGenerator({
		tasks: chooseTaskPresetsByResources(allTaskPresets, resources, 2),
		bugs: bugPresetsByResources(allBugs, resources),
		scoreCalculator: sumStatScores,
	})
}
