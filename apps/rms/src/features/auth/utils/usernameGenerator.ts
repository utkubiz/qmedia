/**
 * Username Generator Utility
 * Provides various methods to generate unique usernames
 */

// List of adjectives and nouns for random username generation
const adjectives = [
	"Happy",
	"Clever",
	"Bright",
	"Swift",
	"Cool",
	"Calm",
	"Brave",
	"Kind",
	"Quick",
	"Smart",
	"Fresh",
	"Noble",
	"Proud",
	"Wise",
	"Sunny",
];

const nouns = [
	"Eagle",
	"Tiger",
	"Panda",
	"Dolphin",
	"Lion",
	"Wolf",
	"Bear",
	"Fox",
	"Hawk",
	"Owl",
	"Dragon",
	"Phoenix",
	"Falcon",
	"Raven",
	"Deer",
];

/**
 * Generates a random number between min and max (inclusive)
 */
const getRandomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a username from name and surname
 */
export const generateFromName = (firstName: string, lastName: string): string => {
	const firstPart = firstName.toLowerCase().slice(0, 3);
	const lastPart = lastName.toLowerCase().slice(0, 3);
	const randomNum = getRandomNumber(100, 999);
	return `${firstPart}${lastPart}${randomNum}`;
};

/**
 * Generates a random username using adjective + noun + number pattern
 */
export const generateRandom = (): string => {
	const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	const randomNum = getRandomNumber(10, 99);
	return `${adjective}${noun}${randomNum}`;
};

/**
 * Generates a custom username with prefix and suffix
 */
export const generateCustom = (prefix: string, suffix?: string, includeNumber = true): string => {
	const randomNum = includeNumber ? getRandomNumber(10, 99) : "";
	const suffixPart = suffix ? suffix : "";
	return `${prefix}${suffixPart}${randomNum}`;
};

/**
 * Sanitizes a username by removing special characters and spaces
 */
export const sanitizeUsername = (username: string): string => {
	return username
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "") // Remove special characters
		.replace(/\s+/g, ""); // Remove spaces
};
