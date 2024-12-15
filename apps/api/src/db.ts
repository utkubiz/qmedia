import mongoose from "mongoose";
import { config } from "./config";
import { logger } from "./shared/helpers/LogHelper";

mongoose.set("debug", false);
mongoose.set("strictQuery", false);

mongoose
	.connect(config.MONGO_URI)
	.then(() => logger.success("✅ Connected to MongoDB"))
	.catch((err) => logger.error(err));

mongoose.plugin((schema: mongoose.Schema) => {
	schema.set("toJSON", {
		transform: (_doc, ret) => {
			ret.__v = undefined;
			return ret;
		},
	});
});
const db = mongoose.connection;
export { db };
