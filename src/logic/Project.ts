import { Resource } from "./Resource"

export type Project = {
	id: string
	domains: Resource[]
}

export function projectResources(project: Project): Resource[] {
	return project.domains;
}