"use client";

import { useEffect, useState } from "react";

type ApiHealth = {
  status: string;
  service: string;
  version: string;
};

export default function Home() {
  const [health, setHealth] = useState<ApiHealth | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

    async function checkBackend(): Promise<void> {
      try {
        const response = await fetch(`${apiUrl}/health`);

        if (!response.ok) {
          throw new Error(`Backend returned status ${response.status}`);
        }

        const data = (await response.json()) as ApiHealth;
        setHealth(data);
      } catch (requestError) {
        const message =
          requestError instanceof Error
            ? requestError.message
            : "Unknown connection error";

        setError(message);
      }
    }

    void checkBackend();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Canadian Autonomous Market Lab
        </p>

        <h1 className="text-5xl font-bold tracking-tight">EconArena</h1>

        <p className="mt-5 max-w-2xl text-lg text-slate-300">
          A controlled environment for testing autonomous investment agents
          using Canadian market data and virtual portfolios.
        </p>

        <section className="mt-12 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">System status</h2>

          {!health && !error && (
            <p className="mt-4 text-slate-400">Checking backend connection…</p>
          )}

          {health && (
            <div className="mt-4 space-y-2">
              <p className="font-medium text-emerald-400">
                Backend connected
              </p>
              <p className="text-slate-300">Service: {health.service}</p>
              <p className="text-slate-300">Version: {health.version}</p>
            </div>
          )}

          {error && (
            <div className="mt-4">
              <p className="font-medium text-red-400">
                Backend connection failed
              </p>
              <p className="mt-2 text-sm text-slate-400">{error}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}