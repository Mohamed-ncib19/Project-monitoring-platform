import PmGroupHeader from "../../../components/pm-group-header/page";
import NavbarSideBarLayout from "../../../layout/navbar-sidebar/page";

const Groups = () => {
    return ( 
        <NavbarSideBarLayout>
            <div>
                <PmGroupHeader color={'primary'} name={'Groups'} />
            </div>
        </NavbarSideBarLayout>
     );
}
 
export default Groups;