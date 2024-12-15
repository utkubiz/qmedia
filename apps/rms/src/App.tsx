import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes";
import "./i18n";

function App() {
	return (
		<>
			<RouterProvider router={routes} />
			<Toaster position="top-right" reverseOrder={false} />
		</>
	);
}

export default App;
