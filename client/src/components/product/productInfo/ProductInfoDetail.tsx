import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProductInfoDetail = () => {
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
              <TableCell>8935235241015</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Supplier
              </TableCell>
              <TableCell>Nhã Nam</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Author
              </TableCell>
              <TableCell>Hoàng Nam Tiến</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Publisher
              </TableCell>
              <TableCell>Hội Nhà Văn</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Publish Year
              </TableCell>
              <TableCell>2024</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Weight
              </TableCell>
              <TableCell>330</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">Size</TableCell>
              <TableCell>20.5 x 14 x 1.5 cm</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Quantity of Page
              </TableCell>
              <TableCell>312</TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="text-[var(--text)] w-[30%]">
                Book Layout
              </TableCell>
              <TableCell>Bìa Mềm</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductInfoDetail;
