import { Category } from "@/types/category";
import React from "react";
import Image from "next/image";
import { useProductStore } from "@/store/productStore";
import { Typography } from "@/ui/design/typography/Typography";

const SingleItem = ({ item }: { item: Category }) => {
  const {products} = useProductStore()
  const product = products.find((p) => p.categoryId===item.id)
  return (
    <a href={`/shop/ShopByCategory/${item.id}`} className="group flex flex-col items-center">
      <div className="max-w-[130px] w-full bg-gray-100 h-32.5 rounded-full flex items-center justify-center mb-4">
        <Image
          src={product?.images?.[1].url || ""}
          alt="Category"
          width={82}
          height={62}
        />
      </div>

      <div className="flex justify-center">
        <Typography
          variant="lead"
          component="h3"
          className="r text-center text-gray bg-gradient-to-r from-primary-800 to-primary-800 bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] hover:bg-[length:100%_3px] group-hover:bg-[length:100%_3px] group-hover:text-primary"
        >
          {item.name}
        </Typography>
      </div>
    </a>
  );
};

export default SingleItem;
