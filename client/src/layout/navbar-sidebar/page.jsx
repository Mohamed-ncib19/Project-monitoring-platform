import './navbar-sidebar.styles.css';
import Navbar from "../../components/navbar/page";
import SideBar from "../../components/sidebar/page";

const NavbarSideBarLayout = ({ children }) => {
    return ( 
        <div className="vh-100 d-flex overflow-hidden"  >
            <div className=" sidebar " >
                <SideBar />
            </div>
              
            <div className="main-content  ">
                    <Navbar />
                
                <div className='' >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default NavbarSideBarLayout;
