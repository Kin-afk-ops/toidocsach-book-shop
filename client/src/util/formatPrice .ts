type Currency = "USD" | "VND";

export function formatPrice(value: number, currency: Currency = "VND"): string {
  const formatter = new Intl.NumberFormat(
    currency === "USD" ? "en-US" : "vi-VN",
    {
      style: "currency",
      currency,
    }
  );

  return formatter.format(value);
}
