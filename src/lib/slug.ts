export function slugify(value: string) {
  const base = value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return base || `artwork-${Date.now()}`;
}

export function uniqueSlug(title: string, existing: string[], current?: string) {
  const base = slugify(title);
  if (current && current === base) return current;
  if (!existing.includes(base) || base === current) return base;

  let i = 2;
  while (existing.includes(`${base}-${i}`)) i += 1;
  return `${base}-${i}`;
}
