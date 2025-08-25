"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ChildProps {
  description: string | undefined;
}
const ProductDescription: React.FC<ChildProps> = ({ description }) => {
  const [fullDescMode, setFullDescMode] = useState<boolean>(false);
  return (
    <div className="mt-4 list-container p-4">
      <h2 className="text-[18px] font-bold">Description</h2>

      <div
        className={`relative text-[14px] text-justify leading-[25px] text-[var(--text)] mt-4 transition-all duration-300`}
      >
        <div
          className={`overflow-hidden transition-all duration-300 ${
            fullDescMode ? "max-h-none" : "max-h-[250px]"
          }`}
        >
          {description && (
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          )}
        </div>
        {!fullDescMode && (
          <div
            className="text-center h-[250px] w-full absolute bottom-0"
            style={{
              background:
                "linear-gradient(180deg, hsla(0, 0%, 100%, 0), #fff 80%)",
            }}
          ></div>
        )}
      </div>

      <div className="w-full flex justify-center">
        <Button
          onClick={() => setFullDescMode((prev) => !prev)}
          variant="secondary"
          className="text-[#2489F4] cursor-pointer mt-2"
        >
          {fullDescMode ? "View less" : "View more"}
        </Button>
      </div>
    </div>
  );
};

export default ProductDescription;
