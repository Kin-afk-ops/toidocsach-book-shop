import CategoriesFilter from "@/components/filter/CategoriesFilter";

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1230px] mx-auto px-4 py-6 flex gap-6">
      <CategoriesFilter />
      <main className="flex-1">{children}</main>
    </div>
  );
}
