/**
 * Returns the correct URL for a public asset in Next.js.
 * Assets in /public are served from / directly, so this is a simple passthrough.
 *
 * Usage:  asset("/assets/MainLogo.webp")  →  "/assets/MainLogo.webp"
 */
export const asset = (path) => path;
