import './login.css';

function Login() {
  return (
    <div className="App">
      <div className="auth-form-container">
        <form className="login-form">
          <h1>Log in</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
