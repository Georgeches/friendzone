import './login.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
function Login({users, currentUser, setCurrentUser}) {
    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()
    
    function handleLogin(e){
        e.preventDefault()
        let foundUsers = []
        if(currentUser.name===undefined){
            for(let user of users){
                if(user.name===username && user.password===password){
                    setCurrentUser(user)
                    console.log(currentUser)
                    foundUsers.unshift('found')
                    alert('Successfully logged in')
                    e.target.form.reset()
                    nav('/')
                }
            }
            
            if(foundUsers.length===0){
                alert('Incorrect username or password')
            }
        }
        else{
            alert('You are already logged in as ' + currentUser.name)
        }
        
    }
  
  return (
      <div className="auth-form-container">
        <form className="login-form">
          <h1>Log in</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={e=>setName(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={e=>setPassword(e.target.value)}/>
          </div>
          <button type="submit" onClick={handleLogin}>Log in</button>
        </form>
      </div>
  );
}

export default Login;