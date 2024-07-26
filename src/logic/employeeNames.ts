import { randItem, AutoFillPool } from './rand';

export function genFirstName(gender?: string) {
	if (gender === undefined)
		gender = randItem(['male', 'female', 'uni'])
	if (gender === 'male' || gender === 'female')
		return randItem(names.first[gender])
	return randItem(names.first.uni)
}

export function genLastName(lastNamePool: AutoFillPool<string>) {
	return lastNamePool.take()
}

export function genFullName(lastNamePool: AutoFillPool<string>, gender?: string) {
	return `${genFirstName(gender)} ${genLastName(lastNamePool)}`
}

export function defualtLastNamePool() {
	return new AutoFillPool(names.last);
}

const names = {
	first: {
		male: [
			'James',
			'John',
			'Robert',
			'Michael',
			'William',
			'David',
			'Richard',
			'Joseph',
			'Charles',
			'Thomas',
			'Christopher',
			'Daniel',
			'Matthew',
			'Anthony',
			'Mark',
			'Donald',
			'Steven',
			'Paul',
			'Andrew',
			'Joshua',
		],
		female: [
			'Mary',
			'Patricia',
			'Jennifer',
			'Linda',
			'Elizabeth',
			'Barbara',
			'Susan',
			'Jessica',
			'Sarah',
			'Karen',
			'Nancy',
			'Lisa',
			'Betty',
			'Margaret',
			'Sandra',
			'Ashley',
			'Kimberly',
			'Emily',
			'Donna',
			'Michelle',
		],
		uni: [
			'Alex',
			'Jordan',
			'Taylor',
			'Morgan',
			'Casey',
			'Jamie',
			'Jesse',
			'Riley',
			'Skyler',
			'Avery',
			'Cameron',
			'Dakota',
			'Drew',
			'Harper',
			'Reese',
			'Quinn',
			'Rowan',
			'Sam',
			'Charlie',
			'Elliot',
		],
	},
	last: [
		'Smith',
		'Johnson',
		'Williams',
		'Brown',
		'Jones',
		'Garcia',
		'Miller',
		'Davis',
		'Rodriguez',
		'Martinez',
		'Hernandez',
		'Lopez',
		'Gonzalez',
		'Wilson',
		'Anderson',
		'Thomas',
		'Taylor',
		'Moore',
		'Jackson',
		'Martin',
		'Lee',
		'Perez',
		'Thompson',
		'White',
		'Harris',
		'Sanchez',
		'Clark',
		'Ramirez',
		'Lewis',
		'Robinson',
		'Walker',
		'Young',
		'Allen',
		'King',
		'Wright',
		'Scott',
		'Torres',
		'Nguyen',
		'Hill',
		'Flores',
		'Green',
		'Adams',
		'Nelson',
		'Baker',
		'Hall',
		'Rivera',
		'Campbell',
		'Mitchell',
		'Carter',
		'Roberts',
	],
};
