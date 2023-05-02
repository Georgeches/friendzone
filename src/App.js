import './App.css';
import ProfileSection from './components/ProfileSection';
import PostsSection from './components/PostsSection';
import SignUp from './components/SignUp';
import Login from './components/Login';
import NoPage from './components/NoPage';
import Footer from './components/Footer';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout />
        }>
          <Route index element={
            <>
            <main>
              <ProfileSection/>
              <PostsSection/>
            </main>
            <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp users={users} setUsers={setUsers}/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
