"use client";

import { useEffect, useState } from "react";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

/**
 * The identity for this browser session, shared by every component that asks
 * for it. Without this, each `useCurrentUser()` caller fired its own
 * `/api/auth/me` — four of them on a lesson page — and the header's badge would
 * have added a fifth, plus a placeholder on every client-side navigation.
 *
 * Only login and logout change who is signed in, and both call
 * `resetCurrentUser()`, so the cache can't outlive the session it describes.
 */
let cached: { user: CurrentUser | null } | null = null;
let inFlight: Promise<CurrentUser | null> | null = null;

function loadCurrentUser(): Promise<CurrentUser | null> {
  if (cached) return Promise.resolve(cached.user);

  // Components mount together, so the first render would otherwise fire one
  // identical request per caller; they share this one instead.
  inFlight ??= fetch("/api/auth/me")
    .then((response) => (response.ok ? response.json() : null))
    .then((data: { user?: CurrentUser } | null) => data?.user ?? null)
    .catch(() => null)
    .then((user) => {
      cached = { user };
      inFlight = null;
      return user;
    });

  return inFlight;
}

/** Drops the cached identity, so the next `useCurrentUser()` asks the server again. */
export function resetCurrentUser() {
  cached = null;
  inFlight = null;
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(() => cached?.user ?? null);
  const [isLoading, setIsLoading] = useState(() => cached === null);

  useEffect(() => {
    let cancelled = false;

    // Not skipped when the cache is warm: another caller's request may have
    // landed between this render and this effect, and the resolved-from-cache
    // path settles immediately with the values state already holds.

    loadCurrentUser().then((loaded) => {
      if (cancelled) return;
      setUser(loaded);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { user, isLoading };
}
