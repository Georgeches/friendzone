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
  const [currentUser, setCurrentUser] = useState({})
  const [pics , setPics] = useState([])
  const [videos , setVideos] = useState([])
  const [search, setSearch] = useState('')
  console.log(currentUser)

  useEffect(() => {
    fetch('http://localhost:4000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])
  useEffect(() => {
    fetch('http://localhost:4000/videos')
    .then(res => res.json())
    .then(data => setVideos(data))
  }, [])
  useEffect(() => {
    fetch('http://localhost:4000/pictures')
    .then(res => res.json())
    .then(data => setPics(data))
  }, [])

  const filteredPics = pics.filter(pic=>pic.user.toLowerCase().search(search)>-1)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout search={search} setSearch={setSearch} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        }>
          <Route index element={
            <>
            <main>
              <ProfileSection currentUser={currentUser} users={users} pics={pics} setPics={setPics}/>
              <PostsSection currentUser={currentUser} users={users} pics={filteredPics} setPics={setPics}/>
            </main>
            <Footer />
            </>
          } />
          <Route path="/login" element={<Login users={users} currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path="/signup" element={<SignUp users={users} setUsers={setUsers}/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
