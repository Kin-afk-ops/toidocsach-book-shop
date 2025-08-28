"use client";

import { History, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Badge } from "../ui/badge";

const HeaderSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [historyMode, setHistoryMode] = useState<boolean>(false);

  const handleSuggest = (value: string) => {
    if (!value.trim()) return;
    console.log("suggest:", value);
    // TODO: gọi API suggest ở đây
  };

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    console.log("search:", value);
    // TODO: gọi API search hoặc chuyển sang trang /search?keyword=value
  };

  return (
    <div className="w-[calc(100%_-_700px)] flex border border-[#ccc] rounded-[10px] items-center relative">
      <input
        placeholder="book"
        className="h-[40px] w-[85%] outline-0 border-0 pl-4"
        value={searchValue}
        onChange={(e) => {
          const newValue = e.target.value;
          setSearchValue(newValue);
          if (newValue.length > 0) {
            handleSuggest(newValue); // gọi suggest khi gõ
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(searchValue); // gọi search khi Enter
          }
        }}
        onFocus={() => setHistoryMode(true)}
        onBlur={() => setHistoryMode(false)}
      />
      <Button
        variant="default"
        className="bg-[#e11d48] hover:bg-[#be123c] cursor-pointer w-[15%] "
      >
        <Search />
      </Button>

      {historyMode && (
        <div className="absolute bg-white top-[100%] left-0 w-full rounded-[5px] p-4 z-10">
          <div className="w-full flex justify-between ">
            <div className="flex">
              <History />
              <p className="font-bold ml-2">Search history</p>
            </div>
            <div className="text-[var(--text)] hover:text-[var(--primary)] hover:underline transition duration-200 cursor-pointer text-[14px]">
              Clear All
            </div>
          </div>

          <div className="mt-2">
            <Badge
              variant="secondary"
              className="flex items-center cursor-pointer "
            >
              <span className="text-[14px]"> Secondary </span>
              <button className="flex outline-0 border-0">
                <X size={14} />
              </button>
            </Badge>
          </div>

          <div className="w-full flex justify-center">
            <button className="text-[var(--text)] hover:text-[var(--primary)] hover:underline transition duration-200 cursor-pointer text-[14px]">
              View All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
