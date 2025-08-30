import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { BookDetailInterface } from "@/interface/book.i";

interface ChildProps {
  bookDetail: BookDetailInterface | undefined;
  bookId: string;
}

const ProductInfoDetail: React.FC<ChildProps> = ({ bookDetail, bookId }) => {
  return (
    <div className="mt-4 list-container p-4">
      <h2 className="text-lg sm:text-xl font-bold mb-3">Thông tin chi tiết</h2>
      <div>
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableBody>
              <TableRow className="">
                <TableCell className="text-[var(--text)] w-[30%]">
                  Mã sản phẩm
                </TableCell>
                <TableCell>{bookId}</TableCell>
              </TableRow>

              <TableRow className="">
                <TableCell className="text-[var(--text)] w-[30%]">
                  Tên Nhà Cung Cấp
                </TableCell>
                <TableCell>{bookDetail?.supplier}</TableCell>
              </TableRow>

              <TableRow className="">
                <TableCell className="text-[var(--text)] w-[30%]">
                  Tác giả
                </TableCell>
                <TableCell>{bookDetail?.author}</TableCell>
              </TableRow>

              <TableRow className="">
                <TableCell className="text-[var(--text)] w-[30%]">
                  NXB
                </TableCell>
                <TableCell>{bookDetail?.publisher}</TableCell>
              </TableRow>

              <TableRow className="">
                <TableCell className="text-[var(--text)] w-[30%]">
                  Năm XB
                </TableCell>
                <TableCell>{bookDetail?.publish_year}</TableCell>
              </TableRow>

              <TableRow className="">
                <TableCell className="text-[var(--text)] w-[30%]">
                  Trọng lượng (gr)
                </TableCell>
                <TableCell>{bookDetail?.weight}</TableCell>
              </TableRow>

              <TableRow className="">
                <TableCell className="text-[var(--text)] w-[30%]">
                  Kích Thước Bao Bì
                </TableCell>
                <TableCell>{bookDetail?.size}</TableCell>
              </TableRow>

              <TableRow className="">
                <TableCell className="text-[var(--text)] w-[30%]">
                  Số trang
                </TableCell>
                <TableCell>{bookDetail?.quantity_of_pages}</TableCell>
              </TableRow>

              <TableRow className="">
                <TableCell className="text-[var(--text)] w-[30%]">
                  Hình thức
                </TableCell>
                <TableCell>{bookDetail?.layout}</TableCell>
              </TableRow>

              {bookDetail?.language && (
                <TableRow className="">
                  <TableCell className="text-[var(--text)] w-[30%]">
                    Ngôn ngữ
                  </TableCell>
                  <TableCell>{bookDetail?.language}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="sm:hidden grid grid-cols-1 gap-3">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-[var(--text)]"> Mã sản phẩm</span>
            <span className="text-right">{bookId}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-[var(--text)]">
              Tên Nhà Cung Cấp
            </span>
            <span className="text-right">{bookDetail?.supplier}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-[var(--text)]">Tác giả</span>
            <span className="text-right">{bookDetail?.author}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-[var(--text)]">NXB</span>
            <span className="text-right">{bookDetail?.publisher}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-[var(--text)]">Năm XB</span>
            <span className="text-right">{bookDetail?.publish_year}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-[var(--text)]">
              Trọng lượng (gr)
            </span>
            <span className="text-right">{bookDetail?.weight}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-[var(--text)]">
              Kích Thước Bao Bì
            </span>
            <span className="text-right">{bookDetail?.size}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-[var(--text)]">Số trang</span>
            <span className="text-right">{bookDetail?.quantity_of_pages}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-[var(--text)]">Hình thức</span>
            <span className="text-right">{bookDetail?.layout}</span>
          </div>

          {bookDetail?.language && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-[var(--text)]">Ngôn ngữ</span>
              <span className="text-right">{bookDetail?.layout}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfoDetail;
