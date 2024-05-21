'use client'
import { useEffect } from "react";
import PmGroupHeader from "../../../../../components/pm-group-header/page";
import NavbarSideBarLayout from "../../../../../layout/navbar-sidebar/page";
import { getProductsByPrograms } from "../../../../api/routes/routesEndpoints";

const ProductsByProgram = ({ params }) => {
    const id  = params.ProgramId;
    console.log(id);

    useEffect(()=>{
        const getProducts = async (id) =>{
            const response = await getProductsByPrograms(id);
            console.log(response);
        };
        getProducts(id);
    },[]);

    return ( 
        <NavbarSideBarLayout>
            <PmGroupHeader color={'danger'} name={'Products'} />
            <p>Program ID: {id}</p>
        </NavbarSideBarLayout>
    );
}
 
export default ProductsByProgram;
