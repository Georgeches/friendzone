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
import $ from 'jquery'

function App() {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [pics , setPics] = useState([])
  const [search, setSearch] = useState('')
  const [comments , setComments] = useState([])
  const [mode, setMode] = useState('Dark')

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

  function lightDark(e){
    e.preventDefault()
    if(mode === 'Light'){
      $('body').css('background-color','rgb(12, 12, 12)')
      $('.posts').css('background-color','rgb(12, 12, 12)')
      $('.profile').css('background-color','rgb(12, 12, 12)')
      $('nav').css('background-color','rgb(12, 12, 12)')
      $('#filter').css('background-color','#606060')
      e.target.style.color = 'rgb(183, 183, 183)'
      setMode('Dark')
    }
    else{
      $('body').css('background-color','white')
      $('body').css('background-color','white')
      $('.posts').css('background-color','white')
      $('.profile').css('background-color','white')
      $('nav').css('background-color','white')
      $('#filter').css('background-color','#f1f1f1')
      e.target.style.color = 'rgb(12, 12, 12)'
      setMode('Light')
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout search={search} setSearch={setSearch} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        }>
          <Route index element={
            <>
            <button onClick={e=>lightDark(e)} className="light-dark" style={{
              border: 'none',
              outline: 'none',
              color: 'rgb(183, 183, 183)',
              background: 'transparent',
              margin: '10px',
              width: (window.screen.width*0.9).toString()+'px',
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              height: '20px',
              fontSize: '25px',
            }}>{mode==='Dark'?<i class="las la-sun"></i>:<i class="las la-moon"></i>}</button>
            <main>
              <ProfileSection currentUser={currentUser} users={users} allPics={pics} setAllPics={setPics} comments={comments} setComments={setComments} filteredPics={userFilteredPics}/>
              <PostsSection setCurrentUser={setCurrentUser} currentUser={currentUser} users={users} pics={filteredPics} setPics={setPics} comments={comments} setComments={setComments}/>
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
