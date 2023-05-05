import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp(props){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const nav = useNavigate()

    function addNewUser(e){
        e.preventDefault()
        let newUser = {
            name: username,
            password: password,
            profile_picture: profilePic,
            followers: []
        }
        console.log(props.users)
        let isUnique = []
        props.users.map(user=>user.name===username ? isUnique.unshift('taken') : console.log('unique'))

        if(isUnique.length > 0){
            alert("username is already taken")
        }
        else{
            axios.post('https://my-json-server.typicode.com/Georgeches/friendzone/users', newUser, {
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(function (response) {
            console.log(response.data);
            })
            .catch(function (error) {
            console.log(error);
            });

            props.setUsers([...props.users, newUser])
            alert('Account has been created successfully. You can now log in')
            e.target.form.reset()
            setProfilePic('')
            nav('/login')
        }
    }

    return(
        <div className="signup-form">
            <h2>Welcome to Friendzone.com</h2>
            <div className="auth-form-container">
            <form>
                <input type="text" placeholder="Enter your username" onChange={e=>setUsername(e.target.value)} />
                <input type="password" placeholder="Enter your password" onChange={e=>setPassword(e.target.value)} />
                <label for="file">Enter profile pic</label>
                <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={e=>{
                    let value = URL.createObjectURL(e.target.files[0]);
                    setProfilePic(value)
                    console.log(value)
                    }}/>
                <p>your profile pic:</p>
                <img src={profilePic} height="100" alt="profile pic" />
                <br/>
                <br/>
                <button onClick={addNewUser}>Create account</button>
                <p>Already have an account? <Link style={{color:'#7843E6'}} to="/login">Log in</Link></p>
            </form>
            </div>
        </div>
    )
}

export default SignUp;