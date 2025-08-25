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
      <h2 className="text-[18px] font-bold">Details</h2>
      <div>
        <Table>
          <TableBody>
            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Product code
              </TableCell>
              <TableCell>{bookId}</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Supplier
              </TableCell>
              <TableCell>{bookDetail?.supplier}</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Author
              </TableCell>
              <TableCell>{bookDetail?.author}</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Publisher
              </TableCell>
              <TableCell>{bookDetail?.publisher}</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Publish Year
              </TableCell>
              <TableCell>{bookDetail?.publish_year}</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Weight
              </TableCell>
              <TableCell>{bookDetail?.weight}</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">Size</TableCell>
              <TableCell>{bookDetail?.size}</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Quantity of Page
              </TableCell>
              <TableCell>{bookDetail?.quantity_of_pages}</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Book Layout
              </TableCell>
              <TableCell>{bookDetail?.layout}</TableCell>
            </TableRow>

            {bookDetail?.language && (
              <TableRow className="">
                <TableCell className="text-[var(--text)] w-[30%]">
                  Language
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
