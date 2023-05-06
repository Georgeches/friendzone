import { Outlet, Link } from "react-router-dom";
import Logo from './Logo.png'
import $ from 'jquery'

function Layout({currentUser, setCurrentUser, search, setSearch}){
    const linkStyle = {
        color: 'rgb(47, 47, 47)',
        fontSize: '18px'
    }

    function handleLogOut(){
        let userConfirm = window.confirm('Are you sure you want to log out')
        if(userConfirm===true){
            setCurrentUser({})
        }
    }
    function showProfile(e){
        if(e.target.textContent === 'Profile'){
            $('.profile').toggle()
            $('.posts').hide()
            e.target.textContent = 'Posts'
        }
        else{
            $('.profile').hide()
            $('.posts').toggle()
            e.target.textContent = 'Profile'
        }
    }
    function showPosts(){
        $('.profile').hide()
        $('.posts').toggle()
    }
    return (
        <>
        <nav>
            <div className="right">
               <img src={Logo} alt="logo" height="80" className="logo" />
                <form>
                    <input type="text" id="filter" placeholder="Type to search..." onChange={e=>{
                        e.preventDefault() 
                        setSearch(e.target.value.replace(/\\/g, ''))}} />
                </form>
            </div>
        
        <div className="buttons">
            <Link style={linkStyle} onClick={showPosts} to="/">Home</Link>
            {currentUser.name===undefined ? 
            <>
            <Link style={linkStyle} to="/login">Log in</Link>
            <Link style={linkStyle} to="/signup">Sign up</Link>
            </>
            :
            <>
            {window.screen.width<1001?
            <p style={linkStyle} onClick={showProfile}>Profile</p>
            :console.log('big')
            }
            
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