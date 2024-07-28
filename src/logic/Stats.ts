import { mapValues } from "radash";
import { Resource, resources } from "./Resource";

export type Stats = {
	[key in Resource]: number
}

export function createStats(
	s?: Partial<Stats>
): Stats {
	const stats = Object.fromEntries(resources.map(r => [r, s?.[r] ?? 0]));
	return stats as Stats;
}

export function statsResources(stats: Stats): Resource[] {
	const all: Resource[] = [];
	for (const resource of resources) {
		const amount = stats[resource];
		if (amount > 0) {
			all.push(resource);
		}
	}
	return all;
}

export function add(a: Stats, b: Stats, mask?: Resource[]) {
	return mapValues(a, (v, key) => {
		const sum = v + b[key];
		if (!mask) return sum;
		if (mask && mask.includes(key)) return sum;

		return v;
	});
}

export function sub(a: Stats, b: Stats, mask?: Resource[]) {
	return mapValues(a, (v, key) => {
		const rem = v - b[key];
		if (!mask) return rem;
		if (mask && mask.includes(key)) return rem;

		return v;
	});
}

export function clamp0(a: Stats) {
	return mapValues(a, (v) => Math.max(0, v));
}

export function allGt0(a: Stats) {
	return Object.values(a).every(v => v >= 0);
}

export function statsZeroed(a: Stats) {
	return Object.values(a).every(v => v === 0);
}