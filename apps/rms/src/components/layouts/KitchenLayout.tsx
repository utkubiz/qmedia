export default function KitchenLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen">
			<main className="h-screen overflow-y-auto bg-base-200">{children}</main>
		</div>
	);
}
