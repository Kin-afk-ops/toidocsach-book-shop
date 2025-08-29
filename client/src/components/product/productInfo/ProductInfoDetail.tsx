import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookDetailInterface } from "@/interface/book.i";

interface ChildProps {
  bookDetail: BookDetailInterface | undefined;
  bookId: string;
}

const ProductInfoDetail: React.FC<ChildProps> = ({ bookDetail, bookId }) => {
  return (
    <div className="mt-4 list-container p-4">
      <h2 className="text-[18px] font-bold">Chi tiết</h2>
      <div>
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
              <TableCell className="text-[var(--text)] w-[30%]">NXB</TableCell>
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
    </div>
  );
};

export default ProductInfoDetail;
