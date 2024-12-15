import i18n from "@/i18n";

type ErrorMessageMap = {
	[key: number]: () => string;
};

export const errorMessageMap: ErrorMessageMap = {
	500: () => i18n.t("errors.default"),
	40400: () => i18n.t("errors.userNotFound"),
	40002: () => i18n.t("errors.emailPasswordDoesNotMatch"),
	40901: () => i18n.t("errors.menuAlreadyExists"),
};
