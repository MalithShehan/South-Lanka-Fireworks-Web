/**
 * Smooth scroll to a section by ID or data-section-anchor attribute.
 * Replaces react-scroll's <Link> component for Next.js compatibility.
 *
 * @param {string} id - The section id to scroll to
 * @param {number} offset - Pixel offset (default -80 for fixed navbar)
 */
export function smoothScrollTo(id, offset = -80) {
  if (typeof window === "undefined") return;
  const el =
    document.getElementById(id) ||
    document.querySelector(`[data-section-anchor="${id}"]`);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  window.history.replaceState(null, "", `#${id}`);
}
