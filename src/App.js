import './App.css';
import ProfileSection from './components/ProfileSection';
import PostsSection from './components/PostsSection';
import SignUp from './components/SignUp';
import Login from './components/Login';
import NoPage from './components/NoPage';
import Footer from './components/Footer';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
