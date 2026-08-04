import { Bell, Globe, UserCircle2 } from "lucide-react";

function Navbar() {
  return (
    <header className="mb-6 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-green-600 shadow-xl">

      <div className="flex items-center justify-between px-8 py-5">

        {/* Left */}

        <div>

          <h1 className="text-3xl font-bold text-white">
            🌾 AgriGenAI Dashboard
          </h1>

          <p className="text-sky-100">
            AI Powered Smart Farming Platform
          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <button className="relative rounded-full bg-white/20 p-3 transition hover:bg-white/30">

            <Bell
              size={20}
              className="text-white"
            />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>

          </button>

          <button className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white transition hover:bg-white/30">

            <Globe size={18} />

            English

          </button>

          <button className="rounded-full bg-white p-2 shadow">

            <UserCircle2
              size={34}
              className="text-green-700"
            />

          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;