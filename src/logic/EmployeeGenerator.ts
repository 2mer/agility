import { createStats } from './Stats';
import { resources } from './Resource';
import { randItem, AutoFillPool, randItems, randInt } from './rand';
import { genFullName, defualtLastNamePool } from './employeeNames';
import { v4 as uuidv4 } from 'uuid';

type StatsGenAttribs = {
	minResources: number;
	maxResources: number;
	minPoints: number,
	maxPoints: number,
}

export class EmployeeGenerator {
	lastNamePool: AutoFillPool<string>;
	stats: StatsGenAttribs;

	constructor() {
		this.lastNamePool = defualtLastNamePool();
		this.stats = {
			minResources: 2,
			maxResources: 4,
			minPoints: 3,
			maxPoints: 8
		};
	}

	genStats() {
		const stats = createStats();

		const numResources = randInt(this.stats.minResources, this.stats.maxResources + 1);
		const selectedResources = randItems(resources, numResources);

		let points = randInt(this.stats.minPoints, this.stats.maxPoints + 1)
		while (points > 0) {
			const r = randItem(selectedResources);
			const rPoints = Math.min(randInt(1, Math.max(Math.floor(points / 3), 1)), points);
			stats[r] += rPoints;
			points -= rPoints;
		}

		return stats;
	}

	nextEmployee() {
		const gender = randItem(['male', 'female']);

		return {
			name: genFullName(this.lastNamePool, randItem([gender, "uni"])),
			id: uuidv4(),
			stats: this.genStats(),
			gender,
		}
	}
}
