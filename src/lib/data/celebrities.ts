export interface Celebrity {
	name: string;
}

export const CELEBRITIES: Celebrity[] = [
	{ name: 'Will Smith' },
	{ name: 'Elon Musk' },
	{ name: 'Beyoncé' },
	{ name: 'Cristiano Ronaldo' },
	{ name: 'Taylor Swift' },
	{ name: 'Drake' },
	{ name: 'Kylie Jenner' },
	{ name: 'LeBron James' },
	{ name: 'Selena Gomez' },
	{ name: 'Dwayne Johnson' },
	{ name: 'Ariana Grande' },
	{ name: 'Justin Bieber' },
	{ name: 'Rihanna' },
	{ name: 'Kim Kardashian' },
	{ name: 'Cardi B' },
	{ name: 'Lionel Messi' },
	{ name: 'Nicki Minaj' },
	{ name: 'Kevin Hart' },
	{ name: 'Billie Eilish' },
	{ name: 'The Weeknd' }
];

export function getRandomCelebrity(): Celebrity {
	return CELEBRITIES[Math.floor(Math.random() * CELEBRITIES.length)];
}
