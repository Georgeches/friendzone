import { useState } from "react"

function SignUp(props){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [profilePic, setProfilePic] = useState('')

    function addNewUser(e){
        e.preventDefault()
        let newUser = {
            name: username,
            password: password,
            profile_picture: profilePic,
            followers: []
        }

        let isUnique = []
        props.users.map(user=>user.name===username ? isUnique.unshift('taken') : console.log('unique'))

        if(isUnique.length > 0){
            alert("username is already taken")
        }
        else{
            fetch('http://localhost:4000/users',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(res=>res.json())
            .then(newData=>console.log(newData))
            alert('Account has been created successfully')
        }
    }

    return(
        <div className="signup-form">
            <form>
                <input type="text" placeholder="Enter your username" onChange={e=>setUsername(e.target.value)} />
                <input type="password" placeholder="Enter your password" onChange={e=>setPassword(e.target.value)} />
                <input type="text" placeholder="Enter your profile pic" onChange={e=>setProfilePic(e.target.value)} />
                <p>your profile pic:</p>
                <img src={profilePic} height="100" alt="profile pic" />
                <br/>
                <br/>
                <button onClick={addNewUser}>Create account</button>
            </form>
        </div>
    )
}

export default SignUp;