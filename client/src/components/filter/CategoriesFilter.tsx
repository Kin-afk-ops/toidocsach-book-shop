import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const CategoriesFilter = () => {
  return (
    <aside className="w-[250px] flex-shrink-0">
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        {/* Example filter: Categories */}
        <div className="mb-4">
          <p className="font-semibold mb-2">Category</p>
          <ul className="space-y-1 pl-3">
            <li className="group">
              <button className="cursor-pointer transition duration-100 group-hover:text-[var(--primary)]">
                Novels
              </button>
            </li>
            <li className="group">
              <button className="cursor-pointer transition duration-100 group-hover:text-[var(--primary)]">
                Science
              </button>
            </li>
            <li className="group">
              <button className="cursor-pointer transition duration-100 group-hover:text-[var(--primary)]">
                History
              </button>
            </li>
          </ul>
        </div>

        {/* Example filter: Price */}
        <div className="mb-4">
          <p className="font-semibold mb-2">Price</p>

          <ul className="space-y-1 pl-3">
            <li className="group flex">
              <Checkbox
                id="100"
                className="border border-[#aaa] mr-2 cursor-pointer "
              />
              <Label
                htmlFor="100"
                className="cursor-pointer transition duration-100 group-hover:text-[var(--primary)]"
              >
                0 - 100k
              </Label>
            </li>
            <li className="group flex">
              <Checkbox
                id="300"
                className="border border-[#aaa] mr-2 cursor-pointer "
              />
              <Label
                htmlFor="300"
                className="cursor-pointer transition duration-100 group-hover:text-[var(--primary)]"
              >
                100k - 300k
              </Label>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default CategoriesFilter;
