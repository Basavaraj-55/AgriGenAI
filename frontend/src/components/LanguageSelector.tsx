// ============================================================
// 🌾 AgriGenAI
// Language Selector
// ============================================================

import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <div className="mt-6">
      <label className="block text-sm font-semibold text-white mb-2">
        🌍 Language
      </label>

      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="w-full rounded-lg border border-green-400 bg-green-700 text-white px-3 py-2"
      >
        <option value="en">🇬🇧 English</option>
        <option value="kn">🇮🇳 ಕನ್ನಡ</option>
      </select>
    </div>
  );
}

export default LanguageSelector;