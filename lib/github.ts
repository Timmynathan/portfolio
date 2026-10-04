// Server-side GitHub data for the dashboard cards. Every call fails soft (null / empty)
// so a rate limit or outage hides a card's data instead of breaking the page.

export const GITHUB_USER = "Timmynathan";

/** Refetch at most every 6 hours — unauthenticated GitHub allows only 60 requests/hour. */
const REVALIDATE_SECONDS = 60 * 60 * 6;

const HEADERS: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  // Optional: set GITHUB_TOKEN (no scopes needed) to lift the rate limit to 5,000/hour.
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: HEADERS,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export interface RecentCommit {
  sha: string;
  repo: string;
  message: string;
  url: string;
  /** Null when the per-commit stats lookup failed. */
  additions: number | null;
  deletions: number | null;
}

interface CommitSearchResult {
  items: {
    sha: string;
    html_url: string;
    commit: { message: string };
    repository: { name: string; full_name: string };
  }[];
}

export async function getRecentCommits(count = 4): Promise<RecentCommit[]> {
  const search = await gh<CommitSearchResult>(
    `/search/commits?q=author:${GITHUB_USER}&sort=author-date&order=desc&per_page=${count}`
  );
  if (!search?.items) return [];

  return Promise.all(
    search.items.slice(0, count).map(async (item) => {
      const detail = await gh<{ stats?: { additions: number; deletions: number } }>(
        `/repos/${item.repository.full_name}/commits/${item.sha}`
      );
      return {
        sha: item.sha,
        repo: item.repository.name,
        message: item.commit.message.split("\n")[0],
        url: item.html_url,
        additions: detail?.stats?.additions ?? null,
        deletions: detail?.stats?.deletions ?? null,
      };
    })
  );
}

export interface LanguageShare {
  name: string;
  /** Share of the average repo, 0–100. */
  percent: number;
}

/** Average language mix across the user's own (non-fork) repos: the top `top`, then "Other". */
export async function getLanguageShares(top = 5): Promise<LanguageShare[]> {
  const repos = await gh<{ name: string; fork: boolean }[]>(`/users/${GITHUB_USER}/repos?per_page=100`);
  if (!repos) return [];

  const perRepo = await Promise.all(
    repos
      .filter((repo) => !repo.fork)
      .map((repo) => gh<Record<string, number>>(`/repos/${GITHUB_USER}/${repo.name}/languages`))
  );

  // Each repo counts once: its own language split is normalised to 1 before summing.
  // Summing raw bytes instead lets one large repo (vendored code, notebooks) swamp everything else.
  const weight = new Map<string, number>();
  for (const languages of perRepo) {
    if (!languages) continue;
    const repoBytes = Object.values(languages).reduce((sum, n) => sum + n, 0);
    if (repoBytes === 0) continue;
    for (const [name, count] of Object.entries(languages)) {
      weight.set(name, (weight.get(name) ?? 0) + count / repoBytes);
    }
  }

  const total = [...weight.values()].reduce((sum, n) => sum + n, 0);
  if (total === 0) return [];

  const sorted = [...weight.entries()].sort((a, b) => b[1] - a[1]);
  const shares = sorted.slice(0, top).map(([name, w]) => ({ name, percent: (w / total) * 100 }));
  const rest = sorted.slice(top).reduce((sum, [, w]) => sum + w, 0);
  if (rest > 0) shares.push({ name: "Other", percent: (rest / total) * 100 });
  return shares;
}
