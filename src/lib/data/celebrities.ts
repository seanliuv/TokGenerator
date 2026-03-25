export interface Celebrity {
	name: string;
	avatarUrl: string;
}

// Public domain / Wikipedia Commons images for well-known public figures
export const CELEBRITIES: Celebrity[] = [
	{
		name: 'Will Smith',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Will_Smith_2011.jpg/220px-Will_Smith_2011.jpg'
	},
	{
		name: 'Elon Musk',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/220px-Elon_Musk_Royal_Society_%28crop2%29.jpg'
	},
	{
		name: 'Beyoncé',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Beyonce_at_The_Fashion_Rocks_2007.jpg/220px-Beyonce_at_The_Fashion_Rocks_2007.jpg'
	},
	{
		name: 'Cristiano Ronaldo',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/220px-Cristiano_Ronaldo_2018.jpg'
	},
	{
		name: 'Taylor Swift',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png/220px-191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png'
	},
	{
		name: 'Drake',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Drake_July_2016.jpg/220px-Drake_July_2016.jpg'
	},
	{
		name: 'Kylie Jenner',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Kylie_Jenner_2019_by_Glenn_Francis.jpg/220px-Kylie_Jenner_2019_by_Glenn_Francis.jpg'
	},
	{
		name: 'LeBron James',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/LeBron_James_crop1.jpg/220px-LeBron_James_crop1.jpg'
	},
	{
		name: 'Selena Gomez',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Selena_Gomez_2015.jpg/220px-Selena_Gomez_2015.jpg'
	},
	{
		name: 'Dwayne Johnson',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Dwayne_Johnson_2014_%28cropped%29.jpg/220px-Dwayne_Johnson_2014_%28cropped%29.jpg'
	},
	{
		name: 'Ariana Grande',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ariana_GrandeTDF2016.jpg/220px-Ariana_GrandeTDF2016.jpg'
	},
	{
		name: 'Justin Bieber',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Justin_Bieber_in_2015.jpg/220px-Justin_Bieber_in_2015.jpg'
	},
	{
		name: 'Rihanna',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Rihanna_-_Barclays_Center_-_Diamonds_World_Tour_%28cropped%29.jpg/220px-Rihanna_-_Barclays_Center_-_Diamonds_World_Tour_%28cropped%29.jpg'
	},
	{
		name: 'Kim Kardashian',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Kim_Kardashian_2015_cropped.jpg/220px-Kim_Kardashian_2015_cropped.jpg'
	},
	{
		name: 'Cardi B',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Belcalis_Marlenis_Almanzar%2C_better_known_as_Cardi_B_%288_of_8%29_%2842742232264%29_%28cropped%29.jpg/220px-Belcalis_Marlenis_Almanzar%2C_better_known_as_Cardi_B_%288_of_8%29_%2842742232264%29_%28cropped%29.jpg'
	},
	{
		name: 'Lionel Messi',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/220px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg'
	},
	{
		name: 'Nicki Minaj',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Nicki_Minaj_%E2%80%93_Mediolanum_Forum_2012_%28cropped%29.jpg/220px-Nicki_Minaj_%E2%80%93_Mediolanum_Forum_2012_%28cropped%29.jpg'
	},
	{
		name: 'Kevin Hart',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Kevin_Hart_2014_%28cropped%29.jpg/220px-Kevin_Hart_2014_%28cropped%29.jpg'
	},
	{
		name: 'Billie Eilish',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Billie_Eilish_at_the_2021_Met_Gala_%28cropped%29.jpg/220px-Billie_Eilish_at_the_2021_Met_Gala_%28cropped%29.jpg'
	},
	{
		name: 'The Weeknd',
		avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/The_Weeknd_-_XO_Crew_on_Tour_%28cropped%29.jpg/220px-The_Weeknd_-_XO_Crew_on_Tour_%28cropped%29.jpg'
	}
];

export function getRandomCelebrity(): Celebrity {
	return CELEBRITIES[Math.floor(Math.random() * CELEBRITIES.length)];
}
