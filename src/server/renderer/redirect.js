export function redirectOnServer(url, { permanent }) {
  return ({ res }) => res.redirect(permanent ? 301 : 302, url);
}