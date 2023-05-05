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
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [pics , setPics] = useState([])
  const [search, setSearch] = useState('')
  const[comments , setComments] = useState([])

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/Georgeches/friendzone/users')
      .then((response) => {
        const data = response.data;
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/Georgeches/friendzone/pictures')
      .then((response) => {
        const data = response.data;
        setPics(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredPics = pics.filter(pic=>pic.user.toLowerCase().search(search.toLocaleLowerCase())>-1)
  const userFilteredPics = pics.filter(pic => pic.user === currentUser.name);
  console.log(userFilteredPics);
  filteredPics.sort(function(a, b){return a.id - b.id});
  filteredPics.reverse()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout search={search} setSearch={setSearch} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        }>
          <Route index element={
            <>
            <main>
              <ProfileSection currentUser={currentUser} users={users} allPics={pics} setAllPics={setPics} comments={comments} setComments={setComments} filteredPics={userFilteredPics}/>
              <PostsSection currentUser={currentUser} users={users} pics={filteredPics} setPics={setPics} comments={comments} setComments={setComments}/>
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
