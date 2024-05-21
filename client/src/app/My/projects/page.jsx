import PmGroupHeader from "../../../components/pm-group-header/page";
import NavbarSideBarLayout from "../../../layout/navbar-sidebar/page";

const Projects = () => {
    return ( 
        <NavbarSideBarLayout>
            <div>
                <PmGroupHeader color={'warning'} name={'Project'} />
            </div>
        </NavbarSideBarLayout>
     );
}
 
export default Projects;