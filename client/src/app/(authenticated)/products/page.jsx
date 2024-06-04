'use client'
import { ProductHeader } from "@/app/(authenticated)/_components/Product/ProductHeader";
import ProductNotFound from '@/../../public/SVG/Product-not-found.svg'  
import Image from "next/image";
import { ProductCard } from "../_components/Product/ProductCard";
const Products = () => {
  const ProductsData = [
    {
      name: "Product name 1",
      description: "This indicates the product intro for lorem lorem lorem lorme lorem lorme lorem",
      startDate: "12/04/2024",
      endDate: "12/04/2025",
      numberOfProjects: 4,
      projectMembers: ["E", "J", "A", "R", "+8"]
    },
    {
      name: "Product name 2",
      description: "This indicates the product intro for lorem lorem lorem lorme lorem lorme lorem",
      startDate: "01/01/2023",
      endDate: "01/01/2024",
      numberOfProjects: 3,
      projectMembers: ["M", "N", "O", "P", "+5"]
    },
  ];
  return (
    <>
    <div>
      <ProductHeader color={'danger'} name={'Product'} />

      <div className="mx-5 ">
          <div className=" portfolio-container row justify-content-start m-auto">
            {ProductsData.length > 0 ? (
              ProductsData.map((portfolio) => (
              <ProductCard dataProvider={portfolio} />
              ))
            ) : (
              <div className=" d-flex flex-column justify-content-center align-items-center">
                <Image
                  priority
                  src={ProductNotFound}
                  alt="Product not found"
                  width={400}
                />
                <p className=" text-dark-gray fw-bolder text-center fs-1">No Product  Found</p>
              </div>
            )}
          </div>
        </div>
    </div>
    
    </>
  );
};

export default Products;
