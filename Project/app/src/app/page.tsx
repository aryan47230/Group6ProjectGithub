import { fetchNbaInjuries } from "../lib/espnInjuries";

export default async function Home() {
  const injuries = await fetchNbaInjuries();

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 font-sans dark:bg-black">
      <main className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              NBA Injury Report
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Live data scraped from ESPN&apos;s NBA injuries page.
            </p>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Total injuries:{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              {injuries.length}
            </span>
          </p>
        </header>

        {injuries.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No injury data could be loaded right now. Please try again in a
            moment.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
              <thead className="bg-zinc-50 dark:bg-zinc-950/40">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Player
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Team
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Pos
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Injury
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {injuries.map((injury) => (
                  <tr key={`${injury.team}-${injury.player}-${injury.date}`}>
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      {injury.player}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300">
                      {injury.team}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400">
                      {injury.position}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400">
                      {injury.date}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200">
                      {injury.injury}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs font-medium text-zinc-900 dark:text-zinc-50">
                      {injury.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
