"use client";

import Navbar from "@/components/Navbar/Navbar";
import { auth, firestore } from "@/firebase/firebase";
import { useGetProblems } from "@/hooks/useGetProblems";
import { DBProblem } from "@/utils/types/problem";
import { DBUser } from "@/utils/types/users";
import { doc, getDoc } from "firebase/firestore";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type Difficulty = "Easy" | "Medium" | "Hard";

const StatCard = ({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string | number;
  subtext?: string;
}) => (
  <div className="rounded-xl border bg-card p-4 shadow-sm">
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
    {subtext && (
      <p className="text-xs text-muted-foreground" data-testid="subtext">
        {subtext}
      </p>
    )}
  </div>
);

const ProgressBar = ({
  value,
  total,
}: {
  value: number;
  total: number;
}) => {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {value}/{total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-primary transition-all"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

const EmptyState = ({ message }: { message: string }) => (
  <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
    {message}
  </div>
);

const Profile = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [userDoc, setUserDoc] = useState<DBUser | null>(null);
  const [loadingUserDoc, setLoadingUserDoc] = useState(false);

  const [loadingProblems, setLoadingProblems] = useState(true);
  const problems = useGetProblems(setLoadingProblems);

  useEffect(() => {
    const fetchUserDoc = async () => {
      if (!user) return;
      setLoadingUserDoc(true);
      try {
        const userRef = doc(firestore, "users", user.uid);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          setUserDoc(snapshot.data() as DBUser);
        }
      } finally {
        setLoadingUserDoc(false);
      }
    };

    fetchUserDoc();
  }, [user]);

  const difficultyStats = useMemo(() => {
    const solvedSet = new Set(userDoc?.solvedProblems || []);
    const totals: Record<Difficulty, { total: number; solved: number }> = {
      Easy: { total: 0, solved: 0 },
      Medium: { total: 0, solved: 0 },
      Hard: { total: 0, solved: 0 },
    };

    problems.forEach((p: DBProblem) => {
      const diff = p.difficulty as Difficulty;
      if (totals[diff]) {
        totals[diff].total += 1;
        if (solvedSet.has(p.id)) {
          totals[diff].solved += 1;
        }
      }
    });
    return totals;
  }, [problems, userDoc?.solvedProblems]);

  const totalSolved = userDoc?.solvedProblems?.length || 0;
  const totalProblems = problems.length;

  const joinDate =
    userDoc?.createdAt &&
    (isNaN(Date.parse(userDoc.createdAt))
      ? userDoc.createdAt
      : format(new Date(userDoc.createdAt), "PPP"));

  const isLoading = loadingUser || loadingUserDoc || loadingProblems;

  if (!user && !loadingUser) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mx-auto flex w-full max-w-screen-md flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-2xl font-semibold">Sign in to view profile</h1>
          <p className="text-muted-foreground">
            Your coding progress, stats, and badges live here.
          </p>
          <Link
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground transition hover:opacity-90"
            href="/auth"
          >
            Go to Sign In
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col gap-6 px-4 py-6 sm:px-8 sm:py-10">
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                  {user?.email?.slice(0, 1).toUpperCase() ?? "?"}
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {user?.displayName || user?.email?.split("@")[0] || "User"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user?.email || "anonymous"}
                  </p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <StatCard
                  label="Total Solved"
                  value={isLoading ? "…" : totalSolved}
                  subtext={isLoading ? undefined : `${totalProblems} problems`}
                />
                <StatCard
                  label="Acceptance"
                  value={isLoading ? "…" : `${totalSolved ? "N/A" : "N/A"}`}
                  subtext="Submissions tracking coming soon"
                />
                <StatCard
                  label="Member Since"
                  value={isLoading ? "…" : joinDate || "—"}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground">Badges</h2>
            {totalSolved === 0 ? (
              <EmptyState message="Solve a problem to start earning badges." />
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-foreground">
                <div className="rounded-lg bg-primary/10 px-3 py-2">
                  <p className="font-semibold">First Solve</p>
                  <p className="text-xs text-muted-foreground">Unlocked</p>
                </div>
                {totalSolved >= 10 && (
                  <div className="rounded-lg bg-primary/10 px-3 py-2">
                    <p className="font-semibold">10 Solves</p>
                    <p className="text-xs text-muted-foreground">Unlocked</p>
                  </div>
                )}
                {totalSolved >= 25 && (
                  <div className="rounded-lg bg-primary/10 px-3 py-2">
                    <p className="font-semibold">25 Solves</p>
                    <p className="text-xs text-muted-foreground">Unlocked</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                Difficulty Progress
              </h2>
              <p className="text-xs text-muted-foreground">
                {isLoading
                  ? "Loading..."
                  : `${totalSolved} / ${totalProblems} solved`}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {(["Easy", "Medium", "Hard"] as Difficulty[]).map((diff) => (
                <div
                  key={diff}
                  className="rounded-lg border bg-muted/40 p-3 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{diff}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        diff === "Easy"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                          : diff === "Medium"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200"
                            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200"
                      }`}
                    >
                      {diff}
                    </span>
                  </div>
                  <ProgressBar
                    value={difficultyStats[diff].solved}
                    total={difficultyStats[diff].total}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                Favorites
              </h2>
              <Link
                className="text-xs text-primary hover:underline"
                href="/"
              >
                View all
              </Link>
            </div>
            <EmptyState message="Star problems to see them here." />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              Recent Activity
            </h2>
            <p className="text-xs text-muted-foreground">
              Submission history coming soon
            </p>
          </div>
          <EmptyState message="Solve a problem to see your history." />
        </div>
      </main>
    </div>
  );
};

export default Profile;
