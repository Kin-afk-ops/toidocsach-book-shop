import ListCart from "@/components/list/ListCart";
import ListPagination from "@/components/list/ListPagination";
import React from "react";
const products: Product[] = [
  {
    id: 1,
    name: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid a, officia asperiores doloribus architecto quos! Facilis architecto tempora doloremque, numquam laboriosam, nobis exercitationem explicabo, quam nihil voluptate libero temporibus odit.",
    price: "120.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    price: "150.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    price: "200.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    price: "90.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 5,
    name: "Sản phẩm 5",
    price: "75.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 6,
    name: "Sản phẩm 6",
    price: "75.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 7,
    name: "Sản phẩm 7",
    price: "75.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 8,
    name: "Sản phẩm 8",
    price: "75.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 9,
    name: "Sản phẩm 9",
    price: "75.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
  {
    id: 10,
    name: "Sản phẩm 10",
    price: "75.000₫",
    image:
      "https://cdn1.fahasa.com/media/catalog/product/4/8/4895232519484.jpg",
  },
];

const ListPage = () => {
  return (
    <div className="list-container">
      <ListCart products={products} />
      <ListPagination />
    </div>
  );
};

export default ListPage;
