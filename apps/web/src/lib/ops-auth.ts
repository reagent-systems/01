/** Checks an HTTP Basic header against the operator password. The user name is ignored. */
export function isOperator(header: string | null, password: string | undefined): boolean {
  if (!password || !header?.startsWith("Basic ")) return false;
  let given: string;
  try {
    given = atob(header.slice(6)).split(":").slice(1).join(":");
  } catch {
    return false;
  }
  if (given.length !== password.length) return false;
  let diff = 0;
  for (let i = 0; i < password.length; i++) diff |= given.charCodeAt(i) ^ password.charCodeAt(i);
  return diff === 0;
}
