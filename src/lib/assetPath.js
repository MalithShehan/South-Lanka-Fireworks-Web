/**
 * Returns the correct URL for a public asset,
 * respecting Vite's base path (works for both dev and GitHub Pages).
 *
 * Usage:  asset("/assets/MainLogo.webp")  →  "/South-Lanka-Fireworks-Web/assets/MainLogo.webp"
 *         asset("assets/MainLogo.webp")   →  same result
 */
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
