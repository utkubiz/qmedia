import translationEN from "@/locales/en.json";
import translationTR from "@/locales/tr.json";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import translationZodEN from "zod-i18n-map/locales/en/zod.json";
import translationZodTR from "zod-i18n-map/locales/tr/zod.json";

const fallbackLng = ["tr"];
const defaultLng = localStorage.getItem("i18nextLng") || "tr";

i18n.use(HttpApi)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lng: defaultLng,
		fallbackLng: fallbackLng,
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"],
		},
		debug: false,
		interpolation: {
			escapeValue: false,
		},
		resources: {
			tr: {
				translation: translationTR,
				zod: translationZodTR,
			},
			en: {
				translation: translationEN,
				zod: translationZodEN,
			},
		},
	});

export default i18n;
