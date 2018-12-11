export function redirectOnClient(url, { permanent }) {
  return () => window.location = url;
}