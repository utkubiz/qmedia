import { MenuIcon } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function LayoutHeader() {
	return (
		<header className="flex items-center justify-between h-16 gap-4 p-4 shadow">
			<div>
				<label htmlFor="my-drawer" className="p-2 drawer-button lg:hidden touch-manipulation">
					<MenuIcon className="w-8 h-8" />
				</label>
			</div>
			<div className="flex items-center gap-4">
				<LogoutButton />
			</div>
		</header>
	);
}
