import ListCartItem from "./ListCartItem";

const ListCart = ({ products }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ListCartItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ListCart;
