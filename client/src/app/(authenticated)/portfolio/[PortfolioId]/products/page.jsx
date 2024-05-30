'use client';
import { useEffect } from 'react';

import { ProductHeader } from '@/app/(authenticated)/_components/ProductHeader';

import { getProductsByPrograms } from '../../../../api/routes/routesEndpoints';

const ProductsByProgram = ({ params }) => {
  const id = params.ProgramId;

  useEffect(() => {
    const getProducts = async (id) => {
      const response = await getProductsByPrograms(id);
    };
    getProducts(id);
  }, []);

  return (
    <>
      <ProductHeader color={'danger'} name={'Products'} />
      <p>Program ID: {id}</p>
    </>
  );
};

export default ProductsByProgram;
