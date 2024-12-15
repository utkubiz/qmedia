import LayoutHeader from "./LayoutHeader";
import Sidebar from "./Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex overflow-hidden fixed top-0 left-0 right-0 bottom-0">
			<div className="drawer lg:drawer-open">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />

				{/* Main Content */}
				<div className="drawer-content flex flex-col overflow-y-auto">
					<LayoutHeader />

					<main data-theme="light" className="flex-1 overflow-y-auto p-4 lg:rounded-tl-lg">
						{children}
					</main>
				</div>

				{/* Sidebar */}
				<aside className="drawer-side">
					<label htmlFor="my-drawer" aria-label="my-drawer" className="drawer-overlay" />
					<div className="w-64 flex-shrink-0 overflow-y-auto min-h-full bg-base-100">
						<div className="p-4 font-bold text-xl h-16 flex items-center">QMedia RMS</div>
						<Sidebar />
					</div>
				</aside>
			</div>
		</div>
	);
}
