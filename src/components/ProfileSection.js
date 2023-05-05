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
    width: window.screen.width>1000 ? preferredWidth : (window.screen.width*0.95).toString()+'px'
  };

  const [postInput, setPostInput] = useState('');
  const[pics , setPics] = useState(filteredPics)
  const[myPics , setMyPics] = useState([])
  const[deletedPics , setDeletedPics] = useState([])

  filteredPics.sort(function(a, b){return a.id - b.id});
  filteredPics.reverse()
  console.log(filteredPics.length)

  function handlePost(e){
    e.preventDefault(); 
    let months = ['January', 'February','March','April','May','June','July','August','September','November','December']
    let dateNow = new Date()
    let day = dateNow.getDay()
    let year = dateNow.getFullYear()
    let month = months[dateNow.getMonth()]
    let currentDate = `${day}th ${month} ${year}`
    console.log(currentDate)

    let x = allPics.length + 1

    let newPost = {
      image: postInput,
      user: currentUser.name,
      date: currentDate,
      likes: 0,
      comments: [],
      id: x
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
        <div className="prof-img" style={{width:'100%'}}>
        <div className="prof-pic-div">
        <img className="prof-pic" src={currentUser.profile_picture} alt="ProfPicture" />
        </div> 
        </div>
        <h3>{currentUser.name}</h3>
        <h5 id="purple" style={fullWidth}>Followers: {currentUser.followers.length}</h5>
       
        <form onSubmit={handlePost} style={{width: '90%', display: 'flex', justifyContent:'start', marginTop:'20px'}}>
                <input name="postInput" id="postInput" type="file" class="form-control-file" onChange={e=>{
                    let value = URL.createObjectURL(e.target.files[0]);
                    setPostInput(value)
                    console.log(value)
                    }} style={{
                      border:'1px solid rgb(185, 185, 185)',
                      outline: 'none', 
                      borderRadius:'10px', 
                      height:'50px', 
                      width: '250px',
                      paddingTop: '9px',
                      paddingLeft: '10px',
                      marginLeft: '10px'
                    }}/>
            <button type="submit">Post</button>
        </form>
        <h4 className="prof-posts-header" style={fullWidth}>Your Posts</h4>
        {filteredPics.map( mypic => (
            <>
            <div className="profile-post" key={mypic.id}>
              <img src={mypic.image} alt="post"/>
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
