import './login.css';
import { useState, useEffect } from 'react';

function Login({users, setLoginUser, loginUser}) {
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(e){
    e.preventDefault()
    if(loginUser.name===undefined){
      const loginInfo = {
        name: username,
        password: password
      }

      let foundUsers = []
  
      for(let user of users){
        if(user.name===username && user.password===password){
          foundUsers.unshift('found')
          setLoginUser(user)
          alert('Successfully logged in')
          e.target.form.reset()
        }
      }

      if(foundUsers.length===0){
        alert('Incorrect username or password')
      }
      

    }
    else{
      alert('you are already logged in')
      console.log(loginUser)
      e.target.form.reset()
    }
  }

  return (
      <div className="auth-form-container">
        <form className="login-form">
          <h1>Log in</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={e=>setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={e=>setPassword(e.target.value)} />
          </div>
          <button type="submit" onClick={handleLogin}>Log in</button>
        </form>
      </div>
  );
}

export default Login;
