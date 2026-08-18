import { SESSION_COOKIE } from "./constants";

export function setSessionCookie(persist: boolean) {
  const maxAge = persist ? `; max-age=${60 * 60 * 24 * 30}` : "";
  document.cookie = `${SESSION_COOKIE}=1; path=/${maxAge}`;
}
