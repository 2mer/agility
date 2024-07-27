import { Task } from "./Task";
import { Resource } from "./Resource";
import { TaskPreset, chooseTaskPresetsByResources, allTaskPresets } from "./TaskPreset";
import { v4 as uuidv4 } from 'uuid';
import { randItem } from "./rand";
import { allBugs, BugPreset, bugPresetsByResources } from './BugPreset';
import { Project, projectResources } from './Project';
import { createStats } from "./Stats";

export type TaskGeneratorPreset = {
	tasks: TaskPreset[],
	bugs: BugPreset[],
}

export class TaskGenerator {
	private preset: TaskGeneratorPreset;

	constructor(preset: TaskGeneratorPreset) {
		this.preset = preset;
	}

	generate(): Task {
		const task = randItem(this.preset.tasks);
		return {
			id: uuidv4(),
			progress: createStats(),
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

export function taskGeneratorByResources(resources: Resource[]) {
	if (resources.length === 0)
		console.error("no resources");

	return new TaskGenerator({
		// tasks: chooseTaskPresetsByResources(allTaskPresets, resources, 2),
		tasks: chooseTaskPresetsByResources(allTaskPresets, resources),
		bugs: bugPresetsByResources(allBugs, resources),
	})
}
