import { Outlet, Link } from "react-router-dom";
import Logo from './Logo.png'

function Layout(){
    return (
        <>
        <nav>
            <div className="right">
               <img src={Logo} alt="logo" height="80" />
                <form>
                    <input type="text" id="filter" placeholder="Type to search..." />
                </form>
            </div>
        
        <div className="buttons">
            <Link style={{color:'rgb(47, 47, 47)', fontSize:'18px'}} to="/">Home</Link>
         
            <Link style={{color:'rgb(47, 47, 47)', fontSize:'18px'}} to="/login">Log in</Link>
    
            <Link style={{color:'rgb(47, 47, 47)', fontSize:'18px'}} to="/signup">Sign up</Link>
   
        </div>
        </nav>
        <Outlet />
        </>
    )
}

export default Layout;