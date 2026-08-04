import { useEffect, useState } from "react";
import MainLayout from "../../../components/layout/MainLayout";

import {
  FiLoader,
  FiSave,
} from "react-icons/fi";

import {
  getSettings,
  updateSettings,
} from "../../../services/adminApi";

// ======================================================
// Interfaces
// ======================================================

interface SettingsData {
  marketplaceName: string;
  supportEmail: string;
  contactNumber: string;
  currency: string;
  deliveryCharge: number;
  theme: string;
}

interface SettingsResponse {
  data?: SettingsData;
  settings?: SettingsData;
}

// ======================================================
// Component
// ======================================================

function Settings() {

  // ======================================================
  // State
  // ======================================================

  const [settings, setSettings] =
    useState<SettingsData>({
      marketplaceName: "",
      supportEmail: "",
      contactNumber: "",
      currency: "INR",
      deliveryCharge: 0,
      theme: "Light",
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ======================================================
  // Fetch Settings
  // ======================================================

  const loadSettings = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await getSettings();

      const result =
        response.data as SettingsResponse;

      const data =
        result.data ??
        result.settings;

      if (data) {

        setSettings({
          marketplaceName:
            data.marketplaceName || "",

          supportEmail:
            data.supportEmail || "",

          contactNumber:
            data.contactNumber || "",

          currency:
            data.currency || "INR",

          deliveryCharge:
            data.deliveryCharge || 0,

          theme:
            data.theme || "Light",
        });

      }

    } catch (err) {

      console.error(err);

      setError(
        "Unable to load settings."
      );

    } finally {

      setLoading(false);

    }

  };

  // ======================================================
  // Initial Load
  // ======================================================

  useEffect(() => {

    loadSettings();

  }, []);

  // ======================================================
  // Input Change
  // ======================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    const { name, value } = e.target;

    setSettings((prev) => ({

      ...prev,

      [name]:
        name === "deliveryCharge"
          ? Number(value)
          : value,

    }));

  };

  // ======================================================
  // Save Settings
  // ======================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (!settings.marketplaceName.trim()) {

      setError(
        "Marketplace name is required."
      );

      return;

    }

    if (!settings.supportEmail.includes("@")) {

      setError(
        "Please enter a valid email."
      );

      return;

    }

    if (!settings.contactNumber.trim()) {

      setError(
        "Contact number is required."
      );

      return;

    }

    try {

      setSaving(true);

      await updateSettings(settings);

      setSuccess(
        "Settings updated successfully."
      );

    } catch (err) {

      console.error(err);

      setError(
        "Unable to save settings."
      );

    } finally {

      setSaving(false);

    }

  };
    // ======================================================
  // Loading UI
  // ======================================================

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center">

          <div className="text-center">

            <FiLoader
              size={50}
              className="mx-auto animate-spin text-green-600"
            />

            <p className="mt-5 text-lg font-semibold text-gray-600">
              Loading Settings...
            </p>

          </div>

        </div>
      </MainLayout>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <MainLayout>

      <div className="min-h-screen bg-gray-50 p-6">

        <div className="mx-auto max-w-5xl">

          {/* Header */}

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-gray-800">
              Marketplace Settings
            </h1>

            <p className="mt-2 text-gray-500">
              Configure your marketplace information and preferences.
            </p>

          </div>

          {/* Error Message */}

          {error && (

            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">

              <p className="font-medium text-red-600">
                {error}
              </p>

            </div>

          )}

          {/* Success Message */}

          {success && (

            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">

              <p className="font-medium text-green-700">
                {success}
              </p>

            </div>

          )}

          {/* Settings Card */}

          <div className="rounded-2xl bg-white p-8 shadow">

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
                            {/* Marketplace Name */}

              <div>

                <label className="mb-2 block font-semibold">
                  Marketplace Name
                </label>

                <input
                  type="text"
                  name="marketplaceName"
                  value={settings.marketplaceName}
                  onChange={handleChange}
                  placeholder="Enter marketplace name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                />

              </div>

              {/* Support Email */}

              <div>

                <label className="mb-2 block font-semibold">
                  Support Email
                </label>

                <input
                  type="email"
                  name="supportEmail"
                  value={settings.supportEmail}
                  onChange={handleChange}
                  placeholder="support@example.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                />

              </div>

              {/* Contact Number */}

              <div>

                <label className="mb-2 block font-semibold">
                  Contact Number
                </label>

                <input
                  type="text"
                  name="contactNumber"
                  value={settings.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                />

              </div>

              {/* Currency */}

              <div>

                <label className="mb-2 block font-semibold">
                  Currency
                </label>

                <select
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                >

                  <option value="INR">
                    INR (₹)
                  </option>

                  <option value="USD">
                    USD ($)
                  </option>

                  <option value="EUR">
                    EUR (€)
                  </option>

                </select>

              </div>

              {/* Delivery Charge */}

              <div>

                <label className="mb-2 block font-semibold">
                  Default Delivery Charge
                </label>

                <input
                  type="number"
                  name="deliveryCharge"
                  value={settings.deliveryCharge}
                  onChange={handleChange}
                  min={0}
                  placeholder="Enter delivery charge"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                />

              </div>

              {/* Theme */}

              <div>

                <label className="mb-2 block font-semibold">
                  Theme
                </label>

                <select
                  name="theme"
                  value={settings.theme}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none"
                >

                  <option value="Light">
                    Light
                  </option>

                  <option value="Dark">
                    Dark
                  </option>

                </select>

              </div>
                            {/* Save Button */}

              <div className="flex justify-end pt-4">

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <FiLoader className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave />
                      Save Settings
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default Settings;