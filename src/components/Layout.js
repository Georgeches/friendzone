import { Outlet, Link } from "react-router-dom";
import Logo from './Logo.png'

function Layout({currentUser, setCurrentUser, search, setSearch}){
    const linkStyle = {
        color: 'rgb(47, 47, 47)',
        fontSize: '18px'
    }

    function handleLogOut(){
        let userConfirm = window.confirm('Are you sure you want to log out')
        userConfirm===true ? setCurrentUser({}) : console.log(currentUser.name)
    }
    return (
        <>
        <nav>
            <div className="right">
               <img src={Logo} alt="logo" height="80" />
                <form>
                    <input type="text" id="filter" placeholder="Type to search..." onChange={e=>setSearch(e.target.value)} />
                </form>
            </div>
        
        <div className="buttons">
            <Link style={linkStyle} to="/">Home</Link>
            {currentUser.name===undefined ? 
            <>
            <Link style={linkStyle} to="/login">Log in</Link>
            <Link style={linkStyle} to="/signup">Sign up</Link>
            </>
            :
            <>
            <Link style={linkStyle} onClick={handleLogOut} to="/">Log out</Link>
            </>
            }
        </div>
        </nav>
        <Outlet />
        </>
    )
}

export default Layout;