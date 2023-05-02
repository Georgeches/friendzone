import './App.css';
import Navbar from './components/NavBar';
import ProfileSection from './components/ProfileSection';
import PostsSection from './components/PostsSection';
import Footer from './components/Footer';
import React , { useState, useEffect } from 'react';
function App() {
  const [users, setUsers] = useState([])
  const mainstyle={
    height: (window.screen.height*0.8).toString()+'px'
  }

  useEffect(()=>{
    fetch('http://localhost:4000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])
  return (
    <div className="App">
      <Navbar users={users}/>
      <main style={mainstyle}>
        <ProfileSection/>
        <PostsSection/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
