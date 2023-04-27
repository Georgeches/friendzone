import SignUp from "./SignUp"

function Navbar(props){
    return (
        <>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Sign up
        </button>

        {/**The sign up modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        </>
    )
}

export default Navbar