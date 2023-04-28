import SignUp from "./SignUp"
import Login from "./Login"
import Logo from './Logo.png'

function Navbar(props){
    return (
        <nav>
            <div className="right">
                <img src={Logo} alt="logo" height="80" />
                <form>
                    <input type="text" id="filter" placeholder="Type to search..." />
                </form>
            </div>
        
        <div className="buttons">
            <button type="button" className="btn" data-toggle="modal" data-target="#login-modal">
            Log in
            </button>
            <button type="button" className="btn" data-toggle="modal" data-target="#signup-modal">
            Sign up
            </button>
        </div>
        
        {/**The sign up modal */}
        <div className="modal fade" id="signup-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Welcome to Friendzone.</h5>
                
            </div>
            <div className="modal-body">
                <SignUp users={props.users}/>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>

        {/**The log in modal */}
        <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Welcome to Friendzone.</h5>
                
            </div>
            <div className="modal-body">
                <Login/>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
        </nav>
    )
}

export default Navbar