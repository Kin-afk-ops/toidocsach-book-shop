function slugToText(slug: string): string {
  if (!slug) return "";
  return slug.replace(/-/g, " ");
}
export default slugToText;
