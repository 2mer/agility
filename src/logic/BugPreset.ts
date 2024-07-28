import { Stats, statsResources } from './Stats';
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

];

