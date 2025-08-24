"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProductDescription = () => {
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
          <p className="mb-4">
            Cuốn sách này kể về mối tình vượt qua hai thế kỷ của thiếu tướng
            Hoàng Đan và vợ là đại biểu Quốc hội Nguyễn Thị An Vinh. Thương nhau
            từ thuở đôi mươi, nên duyên vợ chồng, họ cùng nhau đi qua những mốc
            lịch sử lớn lao của dân tộc: chiến thắng Điện Biên Phủ 1954, Khe
            Sanh 1968, Quảng Trị 1972, Sài Gòn 1975, biên giới phía Bắc 1979 và
            1984.
          </p>
          <p>
            Vị tướng trận đi khắp các chiến trường ác liệt, người vợ ở nhà nuôi
            con và phấn đấu sự nghiệp, thời gian họ ở bên nhau ít ỏi vô cùng. Vì
            thế họ gửi gắm tâm tình qua những lá thư băng qua bom đạn, vượt các
            biên giới. Những lá thư trở thành sợi dây buộc chặt tình yêu của hai
            con người.
          </p>
          <p>
            Hoàng Nam Tiến đã viết thật xúc động về câu chuyện tình yêu tràn đầy
            trìu mến của ba mẹ, thông qua những lá thư ấy, không chỉ để lưu giữ
            ký ức riêng của gia đình, mà còn kể lại cho người đọc hôm nay về một
            thời đại vô cùng anh hùng và tuyệt vời lãng mạn.
          </p>
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
