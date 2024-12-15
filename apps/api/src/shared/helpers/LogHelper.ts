import chalk from "chalk";

type consoleType = "info" | "error" | "log" | "warn";

function loggerGenerator(type: consoleType, color: keyof typeof chalk) {
	return function logger(...args: unknown[]) {
		const coloredArgs = args.map((arg) => {
			const chalkFunction = (chalk as unknown as Record<string, (text: string) => string>)[color];
			if (typeof chalkFunction === "function") {
				return typeof arg === "object"
					? chalkFunction(JSON.stringify(arg, null, 2))
					: chalkFunction(String(arg));
			}
			return arg;
		});
		console[type](...coloredArgs);
	};
}

export const logger = {
	info: loggerGenerator("info", "cyan"),
	success: loggerGenerator("info", "green"),
	error: loggerGenerator("error", "red"),
	log: loggerGenerator("log", "white"),
	warn: loggerGenerator("warn", "yellow"),
};
