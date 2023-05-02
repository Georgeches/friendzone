import { Outlet, Link } from "react-router-dom";
import Logo from './Logo.png'

function Layout(props){
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
            <button type="button" className="btn">
            <Link to="/">Home</Link>
            </button>
            <button type="button" className="btn">
            <Link to="/login">Log in</Link>
            </button>
            <button type="button" className="btn">
            <Link to="/signup">Sign up</Link>
            </button>
        </div>
        </nav>
        <Outlet />
        </>
    )
}

export default Layout;