import { useTranslation } from "react-i18next";

export default function EmptyMenuState() {
	const { t } = useTranslation();

	return <div className="text-center py-8 text-gray-500">{t("messages.noMenus")}</div>;
}
