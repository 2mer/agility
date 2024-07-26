export function randInt(low: number, high: number): number {
	const delta = Math.random() * (high - low);
	return low + Math.floor(delta);
}

export function randItem<T>(items: T[]): T {
	return items[randInt(0, items.length)];
}

export function randItems<T>(items: readonly T[], n: number): T[] {
	const arr = items.slice();
	const out = []
	for (let i = 0; i < n; ++i) {
		const idx = randInt(0, arr.length);
		out.push(arr.splice(idx, 1)[0])
	}
	return out;
}

export function shuffle<T>(items: T[]): T[] {
	const shuffledArray = items.slice();
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = randInt(0, i + 1);
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}

export function bernoulli(p: number) {
	return Math.random() < p;
}

export class Bernoulli {
	constructor(public p: number) { }

	generate() {
		bernoulli(this.p);
	}
}

export class AutoFillPool<T> {
	items: T[];
	currentItems: T[];

	constructor(items: T[]) {
		if (items.length === 0)
			console.error("AutoFillPool got an empty array");
		this.items = items;
		this.currentItems = shuffle(items);
	}

	reset() {
		this.currentItems = shuffle(this.items);
	}

	take() {
		if (this.currentItems.length === 0) {
			this.reset();
		}

		const idx = randInt(0, this.currentItems.length);
		const task = this.currentItems.splice(idx, 1)[0];
		return task;
	}
}