if (typeof window !== "undefined") {
  throw new Error(
    "src/lib/users.ts contains mock credentials and must only be imported from server code (e.g. route handlers).",
  );
}

export type UserRole = "admin" | "user";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

/**
 * Hardcoded stand-in for a users table. Swap this for a real database
 * query (e.g. `db.user.findUnique(...)`) once persistence is wired up —
 * `MockUser` and `verifyCredentials` are shaped to make that swap a
 * drop-in replacement for the callers in `src/app/api/auth/*`.
 */
const MOCK_USERS: MockUser[] = [
  {
    id: "usr_admin",
    name: "Admin Cursora",
    email: "admin@cursora.com",
    password: "Admin123!",
    role: "admin",
  },
  {
    id: "usr_demo",
    name: "Usuario Demo",
    email: "user@cursora.com",
    password: "User123!",
    role: "user",
  },
];

export function findUserById(id: string): MockUser | undefined {
  return MOCK_USERS.find((user) => user.id === id);
}

export function verifyCredentials(email: string, password: string): MockUser | null {
  const user = MOCK_USERS.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) return null;
  return user;
}
