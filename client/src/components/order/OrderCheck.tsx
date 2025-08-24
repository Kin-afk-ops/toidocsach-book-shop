import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import PrimaryButton from "../customs/PrimaryButton";

const OrderCheck = () => {
  return (
    <div className="flex w-full justify-center my-4">
      <div className="w-full bg-white p-4">
        <div className="py-4 text-[16px] font-bold uppercase w-full border-b border-[#ccc]">
          Check order again
        </div>

        <div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Image
                    src={
                      "https://cdn1.fahasa.com/media/catalog/product//8/9/8935235241015.jpg"
                    }
                    alt="image"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div className="w-[300px] h-[119px] flex flex-col justify-between text-[14px] text-[var(--text)]">
                    <p className="whitespace-normal break-words line-clamp-2 text-justify w-full">
                      Thư Cho Em Lorem ipsum dolor sit amet consectetur,
                      adipisicing elit. Rem adipisci id voluptatibus? Itaque
                      nihil officia sint quaerat atque nobis nisi, aliquid
                      magnam perspiciatis reprehenderit ab dolorum deleniti.
                      Earum, qui fuga.
                    </p>
                  </div>
                </TableCell>
                <TableCell className="flex items-center flex-col">
                  <p className="text-[16px] line-[16px">112,000đ</p>
                  <p className="line-through">140,000đ</p>
                </TableCell>
                <TableCell className="text-center align-top">1</TableCell>
                <TableCell className="text-center align-top font-bold text-[var(--primary)]">
                  $250.00
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Image
                    src={
                      "https://cdn1.fahasa.com/media/catalog/product//8/9/8935235241015.jpg"
                    }
                    alt="image"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div className="w-[300px] h-[119px] flex flex-col justify-between text-[14px] text-[var(--text)]">
                    <p className="whitespace-normal break-words line-clamp-2 text-justify w-full">
                      Thư Cho Em Lorem ipsum dolor sit amet consectetur,
                      adipisicing elit. Rem adipisci id voluptatibus? Itaque
                      nihil officia sint quaerat atque nobis nisi, aliquid
                      magnam perspiciatis reprehenderit ab dolorum deleniti.
                      Earum, qui fuga.
                    </p>
                  </div>
                </TableCell>
                <TableCell className="flex items-center flex-col">
                  <p className="text-[16px] line-[16px">112,000đ</p>
                  <p className="line-through">140,000đ</p>
                </TableCell>
                <TableCell className="text-center align-top">1</TableCell>
                <TableCell className="text-center align-top font-bold text-[var(--primary)]">
                  $250.00
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Image
                    src={
                      "https://cdn1.fahasa.com/media/catalog/product//8/9/8935235241015.jpg"
                    }
                    alt="image"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div className="w-[300px] h-[119px] flex flex-col justify-between text-[14px] text-[var(--text)]">
                    <p className="whitespace-normal break-words line-clamp-2 text-justify w-full">
                      Thư Cho Em Lorem ipsum dolor sit amet consectetur,
                      adipisicing elit. Rem adipisci id voluptatibus? Itaque
                      nihil officia sint quaerat atque nobis nisi, aliquid
                      magnam perspiciatis reprehenderit ab dolorum deleniti.
                      Earum, qui fuga.
                    </p>
                  </div>
                </TableCell>
                <TableCell className="flex items-center flex-col">
                  <p className="text-[16px] line-[16px">112,000đ</p>
                  <p className="line-through">140,000đ</p>
                </TableCell>
                <TableCell className="text-center align-top">1</TableCell>
                <TableCell className="text-center align-top font-bold text-[var(--primary)]">
                  $250.00
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <span className="text-[18px] ">Order Total: </span>
              <span className="ml-2 text-[20px] font-bold text-[var(--primary)]">
                $250.00
              </span>
            </div>
            <div className="w-[50%]">
              <PrimaryButton content="Order Confirmation" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCheck;
