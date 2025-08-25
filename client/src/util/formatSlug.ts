import slugify from "slugify";

const formatSlug = (
  text: string,
  options?: {
    replacement?: string;
    remove?: RegExp;
    lower?: boolean;
    strict?: boolean;
    locale?: string;
    trim?: boolean;
  }
): string => {
  return slugify(text, {
    replacement: options?.replacement ?? "-",
    remove: options?.remove,
    lower: options?.lower ?? true,
    strict: options?.strict ?? false,
    locale: options?.locale ?? "vi",
    trim: options?.trim ?? true,
  });
};

export default formatSlug;
