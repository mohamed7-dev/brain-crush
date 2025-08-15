const CATEGORY_COLORS = [
  "#1976d2",
  "#d81b60",
  "#43a047",
  "#f57c00",
  "#6a1b9a",
  "#00897b",
  "#c2185b",
];

export function getCategoryColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CATEGORY_COLORS[Math.abs(hash) % CATEGORY_COLORS.length];
}
