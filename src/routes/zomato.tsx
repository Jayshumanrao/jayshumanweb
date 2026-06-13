import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import csvRaw from "@/lib/zomato-data.csv?raw";

export const Route = createFileRoute("/zomato")({
  component: ZomatoPage,
  head: () => ({
    meta: [
      { title: "Zomato Restaurant Rating Predictor" },
      {
        name: "description",
        content:
          "Predict the expected Zomato rating for a restaurant based on online ordering, table booking, votes, cost for two and restaurant type.",
      },
    ],
  }),
});

type Row = {
  online_order: number; // 0/1
  book_table: number; // 0/1
  votes: number;
  cost: number;
  type: number; // 0..3
  rate: number;
};

const TYPE_MAP: Record<string, number> = {
  Buffet: 0,
  Cafes: 1,
  Dining: 2,
  other: 3,
};

function parseData(): Row[] {
  const lines = csvRaw.trim().split(/\r?\n/);
  const rows: Row[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    if (cols.length < 7) continue;
    const rateStr = cols[3].split("/")[0].trim();
    const rate = parseFloat(rateStr);
    if (Number.isNaN(rate)) continue;
    const cost = parseFloat(cols[5].replace(/,/g, ""));
    rows.push({
      online_order: cols[1].trim() === "Yes" ? 1 : 0,
      book_table: cols[2].trim() === "Yes" ? 1 : 0,
      votes: parseInt(cols[4], 10) || 0,
      cost: Number.isNaN(cost) ? 0 : cost,
      type: TYPE_MAP[cols[6].trim()] ?? 3,
      rate,
    });
  }
  return rows;
}

function predict(rows: Row[], q: Omit<Row, "rate">): number {
  // Normalize numeric features by dataset range, then weighted k-NN avg.
  const maxVotes = Math.max(...rows.map((r) => r.votes), 1);
  const maxCost = Math.max(...rows.map((r) => r.cost), 1);
  const scored = rows.map((r) => {
    const dv = (r.votes - q.votes) / maxVotes;
    const dc = (r.cost - q.cost) / maxCost;
    const d =
      Math.abs(r.online_order - q.online_order) * 0.6 +
      Math.abs(r.book_table - q.book_table) * 0.6 +
      (r.type === q.type ? 0 : 0.8) +
      Math.abs(dv) * 1.2 +
      Math.abs(dc) * 1.2;
    return { rate: r.rate, d };
  });
  scored.sort((a, b) => a.d - b.d);
  const k = Math.min(7, scored.length);
  let wsum = 0;
  let sum = 0;
  for (let i = 0; i < k; i++) {
    const w = 1 / (scored[i].d + 0.05);
    sum += scored[i].rate * w;
    wsum += w;
  }
  return sum / wsum;
}

function ZomatoPage() {
  const rows = useMemo(parseData, []);
  const [online, setOnline] = useState("Yes");
  const [book, setBook] = useState("No");
  const [type, setType] = useState("Buffet");
  const [votes, setVotes] = useState(150);
  const [cost, setCost] = useState(500);
  const [result, setResult] = useState<number | null>(null);

  const onPredict = () => {
    const r = predict(rows, {
      online_order: online === "Yes" ? 1 : 0,
      book_table: book === "Yes" ? 1 : 0,
      votes,
      cost,
      type: TYPE_MAP[type],
    });
    setResult(Math.round(r * 100) / 100);
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="mx-auto max-w-2xl px-6">
        <header className="mb-8 text-center">
          <div className="text-4xl">🍴</div>
          <h1 className="font-display mt-2 text-4xl font-bold tracking-tight">
            Restaurant Rating Predictor
          </h1>
          <p className="text-ink-muted mt-2 text-sm">
            ML-powered estimate based on the Zomato dataset (k-NN over 148 restaurants).
          </p>
        </header>

        <section className="glass rounded-3xl p-6 shadow-elegant">
          <h2 className="font-display mb-4 text-lg font-semibold">
            📝 Restaurant Configuration
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Online Order?">
              <Select value={online} onChange={setOnline} options={["Yes", "No"]} />
            </Field>
            <Field label="Table Booking?">
              <Select value={book} onChange={setBook} options={["Yes", "No"]} />
            </Field>
            <Field label="Restaurant Type">
              <Select
                value={type}
                onChange={setType}
                options={["Buffet", "Cafes", "Dining", "other"]}
              />
            </Field>
            <Field label={`Total Votes: ${votes}`}>
              <input
                type="range"
                min={0}
                max={5000}
                value={votes}
                onChange={(e) => setVotes(Number(e.target.value))}
                className="w-full accent-[#ff4b4b]"
              />
            </Field>
            <Field label="Cost for Two (INR)">
              <input
                type="number"
                min={0}
                max={10000}
                value={cost}
                onChange={(e) => setCost(Number(e.target.value) || 0)}
                className="bg-background border-border w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-[#ff4b4b]"
              />
            </Field>
          </div>

          <button
            onClick={onPredict}
            className="mt-6 w-full rounded-full bg-[#ff4b4b] py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            CALCULATE EXPECTED RATING
          </button>

          {result !== null && (
            <div className="mt-6 text-center">
              <h2 className="text-3xl font-bold text-[#ff4b4b]">
                Predicted Rating: {result} / 5 ⭐
              </h2>
              <p className="text-ink-muted mt-2 text-sm">
                {result >= 4.0
                  ? "🔥 High Probability of Success!"
                  : "💡 Average Performance Expected."}
              </p>
            </div>
          )}
        </section>

        <p className="text-ink-muted mt-6 text-center text-xs">
          Original Streamlit project by Kishan &amp; M. Hamma Yasar — ported to the web.
        </p>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-ink-muted mb-1.5 block text-xs font-medium">{label}</span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-background border-border w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-[#ff4b4b]"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
