import { toast } from "react-hot-toast";
import { errorMessageMap } from "./errorMessages";

export const handleApiError = (err: any) => {
	let statusCode = 500;
	let errorMessage = errorMessageMap[500];

	if (err.data?.error) {
		const backendError = err.data.error;
		statusCode = backendError.statusCode;

		errorMessage = errorMessageMap[statusCode] || errorMessage;
	}
	console.error(`Error: ${statusCode} - ${errorMessage}`);
	toast.error(errorMessage || "An unknown error occurred.");
};
