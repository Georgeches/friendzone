import React, { useEffect, useState } from "react";

function ProfileSection({currentUser , comments , setComments}) {
  let preferredHeight = (window.screen.height*0.75).toString()+'px';
  let preferredWidth = (window.screen.width*0.3).toString()+'px';

  const mystyle = {
    height: preferredHeight,
    width: preferredWidth
  };

  const [postInput, setPostInput] = useState('');
  const[pics , setPics] = useState([])
  const[myPics , setMyPics] = useState([])
  const[deletedPics , setDeletedPics] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/pictures')
      .then(res => res.json())
      .then(data => {setPics(data);
        const filteredPics = data.filter(pic => pic.user === currentUser.name);
        setMyPics(filteredPics);
      });
  }, [currentUser.name]);


  function handlePost(event){
    event.preventDefault(); 
    let postInput = document.getElementById("postInput").value;
    let currentDate = new Date().toISOString();
    
    console.log("debug");

    let newPost = {
      image: postInput,
      user: currentUser.name,
      date: currentDate,
      likes: 0,
      comments: []
    };

    console.log(newPost);
    
    fetch('http://localhost:4000/pictures' ,{
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body : JSON.stringify(newPost)
    });
  }

  function handleComments(mypic) {
    setComments(mypic.comments);
  }

  function handleDelete(id){
    fetch(`http://localhost:4000/pictures/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
    });
  
    let DeletedPics = myPics.filter(mypic => mypic.id !== id)
    setDeletedPics(DeletedPics);
    setMyPics(DeletedPics);
  }
  
  
  

  return (
    currentUser.name === undefined ? 
      <div className="profile">
        <h3>You are not logged in.</h3>
      </div>
    :
    <>
      <div className="profile" style={mystyle}>
        <img src={currentUser.profile_picture} alt="Profile Picture" />
        <h3>{currentUser.name}</h3>
        <h5 id="purple">Followers: {currentUser.followers.length}</h5>
        <form onSubmit={handlePost}>
            <input type="text" id="postInput" placeholder="Add New Post..." value={postInput} onChange={(event) => setPostInput(event.target.value)} />
            <button type="submit">Post</button>
        </form>

        <h4>My Posts</h4>
        {myPics.map( mypic => (
            <>
            <div key={mypic.id}>
              <img src={mypic.image}/>
              <p>{mypic.likes} likes</p>
              <p>{mypic.comments.length} comments</p>
              <button onClick={() => handleComments(mypic)} data-toggle="modal" data-target="#mycomments-modal" className="comment-btn">Comment</button>
              <button onClick={() => handleDelete(mypic.id)}>Delete Post</button>
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
