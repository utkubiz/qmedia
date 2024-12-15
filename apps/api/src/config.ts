import "dotenv/config";

export const config = {
	PORT: process.env.PORT || 5005,
	WEB_BASE_URL: process.env.WEB_BASE_URL || "http://localhost:5173",
	MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/qmedia",
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
	ACCESS_TOKEN_EXPIRATION_TIME: "30m",
	REFRESH_TOKEN_EXPIRATION_TIME: "30d",
	REFRESH_TOKEN_EXPIRATION_TIME_MS: 30 * 24 * 60 * 60 * 1000,
};
