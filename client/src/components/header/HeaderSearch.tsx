"use client";

import { History, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { useHistoryStore } from "@/store/useHistoryStore";
import axiosInstance from "@/lib/api/axiosInstance";
import { useRouter } from "next/navigation";

const HeaderSearch = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const [historyMode, setHistoryMode] = useState<boolean>(false);
  const [suggestList, setSuggestList] = useState<string[]>([]);
  const [suggestMode, setSuggestMode] = useState<boolean>(false);

  const histories = useHistoryStore((state) => state.history);
  const addHistory = useHistoryStore((state) => state.addHistory);
  const clearHistory = useHistoryStore((state) => state.clear);

  const handleSuggest = async (value: string) => {
    if (!value.trim()) return;

    try {
      const res = await axiosInstance.post(`/suggest`, {
        search: value,
        history: histories || [],
      });

      setSuggestList(res.data);
      setSuggestMode(true);
      setHistoryMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (value: string) => {
    if (!value.trim()) return;

    addHistory(value); // lưu vào lịch sử
    router.push(`/categories/search?q=${encodeURIComponent(value)}&page=${1}`);
    setSuggestMode(false);
    setHistoryMode(false);
  };

  const handleFocus = () => {
    if (searchValue.trim() === "") {
      if (histories && histories.length > 0) {
        setHistoryMode(true);
      }
    } else if (suggestList.length > 0) {
      setSuggestMode(true);
    }
  };

  return (
    <div
      className="
    flex items-center border border-[#ccc] rounded-[10px] relative
    w-full md:flex-1 md:max-w-[600px]
    bg-white
  "
    >
      <input
        placeholder="book"
        className="h-10 flex-1 outline-0 border-0 pl-4 text-sm sm:text-base"
        value={searchValue}
        onChange={(e) => {
          const val = e.target.value;
          setSearchValue(val);
          if (val.trim().length > 0) handleSuggest(val);
          else {
            setSuggestMode(false);
            setSuggestList([]);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(searchValue);
        }}
        onFocus={handleFocus}
        onBlur={() => {
          // blur sẽ xảy ra khi click ra ngoài dropdown
          setHistoryMode(false);
          setSuggestMode(false);
        }}
      />
      <Button
        variant="default"
        className="bg-[#e11d48] hover:bg-[#be123c] cursor-pointer h-10 px-4 sm:px-6"
        onClick={() => handleSearch(searchValue)}
      >
        <Search size={18} />
      </Button>

      {/* History Dropdown */}
      {historyMode && histories && histories.length > 0 && (
        <div
          className="absolute bg-white top-[100%] left-0 w-full rounded-[5px] p-4 z-10"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="w-full flex justify-between">
            <div className="flex items-center">
              <History />
              <p className="font-bold ml-2">Lịch sử tìm kiếm</p>
            </div>
            <div
              className="text-[var(--text)] hover:text-[var(--primary)] hover:underline cursor-pointer text-[14px]"
              onMouseDown={(e) => {
                e.preventDefault();
                clearHistory();
              }} // ngăn onBlur
            >
              Xóa tất cả
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-2 text-xs sm:text-sm">
            {histories.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center cursor-pointer"
                onMouseDown={(e) => {
                  e.preventDefault(); // ngăn blur
                  handleSearch(item);
                }}
              >
                <span className="text-[14px]">{item}</span>
                <button
                  className="flex outline-0 border-0"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Suggest Dropdown */}
      {suggestMode && suggestList.length > 0 && (
        <div className="absolute bg-white top-[100%] left-0 w-full rounded-[5px] p-4 z-10">
          <div className="w-full flex justify-between">
            <div className="flex items-center">
              <History />
              <p className="font-bold ml-2">Gợi ý</p>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-2 text-xs sm:text-sm">
            {suggestList.map((suggest, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center cursor-pointer"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSearch(suggest);
                }}
              >
                <span className="text-[14px]">{suggest}</span>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
