// ============================================================
// 🌾 AgriGenAI
// Custom Language Hook
// ============================================================

import { useTranslation } from "react-i18next";

// ============================================================
// useLanguage Hook
// ============================================================

export function useLanguage() {

    const { i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return {

        language: i18n.language,

        setLanguage: changeLanguage,

        i18n

    };

}