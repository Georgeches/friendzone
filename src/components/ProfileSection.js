import React, { useEffect, useState } from "react";
import axios from 'axios';

function ProfileSection({filteredPics,currentUser , comments , setComments, allPics, setAllPics}) {
  let preferredHeight = (window.screen.height*0.75).toString()+'px';
  let preferredWidth = (window.screen.width*0.3).toString()+'px';
  
  let fullWidth = {
    width: '90%'
  } 

  const mystyle = {
    height: preferredHeight,
    width: preferredWidth
  };

  const [postInput, setPostInput] = useState('');
  const[pics , setPics] = useState(filteredPics)
  const[myPics , setMyPics] = useState([])
  const[deletedPics , setDeletedPics] = useState([])

  function handlePost(e){
    e.preventDefault(); 
    let postInput = document.getElementById("postInput").value;
    let months = ['January', 'February','March','April','May','June','July','August','September','November','December']
    let dateNow = new Date()
    let day = dateNow.getDay()
    let year = dateNow.getFullYear()
    let month = months[dateNow.getMonth()]
    let currentDate = `${day}th ${month} ${year}`
    console.log(currentDate)


    let newPost = {
      image: postInput,
      user: currentUser.name,
      date: currentDate,
      likes: 0,
      comments: []
    };

    console.log(newPost);

    axios.post('https://my-json-server.typicode.com/Georgeches/friendzone/pictures', newPost)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    setAllPics([...allPics, newPost])
    setMyPics([...myPics, newPost])
    alert('Posted')
    setPostInput('')
  }

  function handleComments(mypic) {
    setComments(mypic.comments);
  }

  function handleDelete(id){
    axios.delete(`https://my-json-server.typicode.com/Georgeches/friendzone/pictures/${id}`, {
      headers: {
        'Authorization': 'Bearer <token>'
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    let DeletedPics = myPics.filter(mypic => mypic.id !== id)
    setDeletedPics(DeletedPics);
    setMyPics(DeletedPics);
    setAllPics(allPics.filter(pic=>pic.id!==id))
  }
  
  
  

  return (
    currentUser.name === undefined ? 
      <div className="profile">
        <h3>You are not logged in.</h3>
      </div>
    :
    <>
      <div className="profile" style={mystyle}>
        <div style={fullWidth}>
        <img className="prof-pic" src={currentUser.profile_picture} alt="Profile Picture" />
        </div>
        <h3>{currentUser.name}</h3>
        <h5 id="purple" style={fullWidth}>Followers: {currentUser.followers.length}</h5>
       
        <form onSubmit={handlePost} style={fullWidth}>
            <input type="text" id="postInput" placeholder="Add New Post..." value={postInput} onChange={(event) => setPostInput(event.target.value)} required/>
            <button type="submit">Post</button>
        </form>
        <h4 className="prof-posts-header" style={fullWidth}>Your Posts</h4>
        {filteredPics.map( mypic => (
            <>
            <div className="profile-post" key={mypic.id}>
              <img src={mypic.image}/>
              <div className="info">
                <div>
                  <p>{mypic.likes} likes</p>
                  <p>{mypic.comments.length} comments</p>
                </div>
                <div className="info-btns">
                  <button onClick={() => handleComments(mypic)} data-toggle="modal" data-target="#mycomments-modal" className="comment-btn">Comments</button>
                  <button onClick={() => handleDelete(mypic.id)}>Delete Post</button>
                </div>
              </div>
              <hr/>
              <div className="modal fade" id="mycomments-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                  <h4>People's Comments</h4>
                  </div>
                  <div className="modal-body">
                  {comments.map(comment => (
                  <div className="comment">
                  <h5>{comment.user}</h5>
                  <h6>{comment.comment}</h6>
                  </div>
                ))}

                  </div>

                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </>
        ))}

      </div>
    </>
  );
}

export default ProfileSection;
