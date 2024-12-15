import { Outlet } from "react-router-dom";

export default function AuthLayout() {
	return (
		<div className="min-h-screen">
			<div className="max-w-xl mx-auto card bg-base-100 my-8">
				<div className="card-body">
					<main>
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
}
