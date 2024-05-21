import PmGroupHeader from "../../../components/pm-group-header/page";
import NavbarSideBarLayout from "../../../layout/navbar-sidebar/page";

const Products = () => {
    return ( 
        <NavbarSideBarLayout>
            <div>
                <PmGroupHeader color={'danger'} name={'Product'} />
            </div>
        </NavbarSideBarLayout>
     );
}
 
export default Products;