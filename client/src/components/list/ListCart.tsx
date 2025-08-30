import { BookItemInterface } from "@/interface/book.i";
import ListCartItem from "./ListCartItem";

interface ChildProps {
  bookItems: BookItemInterface[];
}

const ListCart: React.FC<ChildProps> = ({ bookItems }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {bookItems?.map((bookItem) => (
        <ListCartItem bookItem={bookItem} key={bookItem.id} />
      ))}
    </div>
  );
};

export default ListCart;
