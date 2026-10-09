import type { Variants } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export const stagger = (gap = 0.1): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap } },
});

// Unsplash helper. Pass the part after images.unsplash.com/
// Example: img("photo-1521572163474-6864f9cf17ab", 900)
export const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
