'use client';

import { ProductHeader } from '@/app/(authenticated)/_components/Product/ProductHeader';
import { ProductCard } from '@/app/(authenticated)/_components/Product/ProductCard';

import ProductNotFound from '@/../../public/SVG/Product-not-found.svg'  


const ProductsByPorftolio = ({ params }) => {
  const { PortfolioId } = params;

  const ProductsData = [
    {
        _id:1,
      name: "Product name 1",
      description: "This indicates the product intro for lorem lorem lorem lorme lorem lorme lorem",
      startDate: "12/04/2024",
      endDate: "12/04/2025",
      numberOfProjects: 4,
      parent:'84a257d5-8199-427a-9ca0-29ab0f5bb031',
      projectMembers: ["E", "J", "A", "R", "+8"]
    },
    {
        _id:2,
      name: "Product name 2",
      description: "This indicates the product intro for lorem lorem lorem lorme lorem lorme lorem",
      startDate: "01/01/2023",
      endDate: "01/01/2024",
      numberOfProjects: 3,
      parent:2,
      projectMembers: ["M", "N", "O", "P", "+5"]
    },
  ];
  
  return (
    <>
      <ProductHeader color={'danger'} name={'Products'} />
      <p>Portfolio ID: {PortfolioId}</p>


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
    </>
  );
};

export default ProductsByPorftolio;
