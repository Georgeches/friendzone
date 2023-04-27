import './App.css';
import Navbar from './components/NavBar';
import { useState, useEffect } from 'react';
function App() {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])
  return (
    <div className="App">
      <Navbar users={users}/>
    </div>
  );
}

export default App;
