import { Domain } from "./Domain"
import { Resource, resourcesByDomain } from "./Resource"

export type Project = {
	id: string
	domains: Domain[]
}

export function projectResources(project: Project): Resource[] {
	let all: Resource[] = [];
	for (const domain of project.domains) {
		all = [...all, ...resourcesByDomain[domain]]
	}
	return all;
}