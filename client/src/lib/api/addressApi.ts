import { Province, Ward } from "@/interface/address.i";

const BASE_URL =
  process.env.NEXT_PUBLIC_ADDRESS_API ||
  "https://provinces.open-api.vn/api/v2/";

export async function getProvinces(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<Province[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const res = await fetch(`${BASE_URL}p/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch provinces");
    return res.json();
  } catch (error) {
    console.error("getProvinces error:", error);
    return [];
  } finally {
    setLoading(false);
  }
}

export async function getWards(
  provinceCode: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<Ward[]> {
  try {
    const res = await fetch(`${BASE_URL}w/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch wards");
    const wards: Ward[] = await res.json();
    return wards.filter((w) => w.province_code === provinceCode);
  } catch (error) {
    console.error("getWards error:", error);
    return [];
  } finally {
    setLoading(false);
  }
}
