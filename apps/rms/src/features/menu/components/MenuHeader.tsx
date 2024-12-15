import { useTranslation } from "react-i18next";

export default function MenuHeader({
	hasMenu,
	onAddMenu,
}: {
	hasMenu: boolean;
	onAddMenu: () => void;
}) {
	const { t } = useTranslation();

	return (
		<div className="flex items-center justify-between p-4">
			<h1 className="text-2xl font-bold">{t("titles.menuManagement")}</h1>
			{!hasMenu && (
				<button
					type="button"
					className="btn btn-primary h-12 min-w-[120px] touch-manipulation"
					onClick={onAddMenu}
				>
					{t("buttons.addNewMenu")}
				</button>
			)}
		</div>
	);
}
