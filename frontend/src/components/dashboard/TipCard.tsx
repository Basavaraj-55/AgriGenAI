import { Lightbulb, ArrowRight } from "lucide-react";

function TipCard() {
  return (
    <section className="mt-8">
      <div className="rounded-2xl bg-gradient-to-r from-green-600 via-green-500 to-sky-600 p-6 shadow-lg">

        <div className="flex items-start justify-between">

          <div className="flex items-start gap-4">

            <div className="rounded-xl bg-white/20 p-3">
              <Lightbulb size={28} className="text-yellow-300" />
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                🌱 AI Farming Tip
              </h2>

              <p className="mt-3 text-green-100 leading-7">
                Water your crops early in the morning or late evening to
                reduce evaporation and improve water absorption.
              </p>

            </div>

          </div>

          <button className="rounded-lg bg-white px-4 py-2 font-semibold text-green-700 transition hover:bg-green-100">
            View More
          </button>

        </div>

      </div>
    </section>
  );
}

export default TipCard;