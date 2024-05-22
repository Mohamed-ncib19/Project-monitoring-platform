import './navbar-sidebar.styles.css';
import Navbar from "../../components/navbar/page";
import SideBar from "../../components/sidebar/page";

const NavbarSideBarLayout = ({ children,user }) => {
    return ( 
        <div className="vh-100 d-flex overflow-hidden"  >
            <div className=" sidebar " >
                <SideBar />
            </div>
              
            <div className="main-content  ">
                    <Navbar user={user} />
                
                <div className='' >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default NavbarSideBarLayout;
