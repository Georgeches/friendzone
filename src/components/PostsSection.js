import React, {useState , useEffect} from "react";
import axios from "axios";

function PostsSection({setCurrentUser, currentUser, users, pics, setPics ,comments ,setComments}){
    let prefferedHeight = (window.screen.height*0.75).toString()+'px'
    let prefferedWidth = (window.screen.width*0.5).toString()+'px'
    const mystyle = {
        height: prefferedHeight,
        width: window.screen.width>1000 ? prefferedWidth : (window.screen.width*0.95).toString()+'px'
      };
    
    const [currentPic, setCurrentPic] = useState(null);
    const [likedPosts, setLikedPosts] = useState([])
    const [commentInput, setCommentInput] = useState('');
    const [likeOrUnlike, setLike] = useState('Like')
    pics.sort(function(a, b){return a.id - b.id});
    pics.reverse()
    console.log(pics)

  function handleSubmit(e) {
    e.preventDefault()
    
    if (!currentPic) return;

    const username = currentUser.name; 
    const newComment = { user: username, comment: commentInput }; 
    setComments([...comments, newComment]);
    setCommentInput('');
    console.log(username);

    axios.patch(`https://my-json-server.typicode.com/Georgeches/friendzone/pictures/${currentPic.id}`, { 
      comments: currentPic.comments.concat(newComment)
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


    function handleLikes(pic, likedPosts, setLikedPosts, setPics) {
      if (likedPosts.includes(pic.id)) {
        // Update likedPosts and the likes count for the post
        setLikedPosts(likedPosts.filter((id) => id !== pic.id));
        setPics((prevPics) =>
          prevPics.map((p) => {
            if (p.id === pic.id) {
              return { ...p, likes: p.likes - 1 };
            }
            return p;
          })
          
        );
      
        axios.patch(`https://my-json-server.typicode.com/Georgeches/friendzone/pictures/${pic.id}`, {
          likes: pic.likes - 1
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        setLike('Like')
      }
      
      else{
        // Update likedPosts and the likes count for the post
        setLikedPosts([...likedPosts, pic.id]);
        setPics((prevPics) =>
          prevPics.map((p) => {
            if (p.id === pic.id) {
              return { ...p, likes: p.likes + 1 };
            }
            return p;
          })
        );
      
        axios.patch(`https://my-json-server.typicode.com/Georgeches/friendzone/pictures/${pic.id}`, {
          likes: pic.likes + 1
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }

    function handleFollow(e,pic) {
      if(e.target.textContent === 'Following'){
        e.target.textContent = 'Follow'
        e.target.classList.add('follow-btn')
        e.target.style.color = 'black'
      }
      else{
        const userId = users.find(user => user.name === pic.user)?.id;
        const selectedProfile = users.find(user => user.name === pic.user)
        if (!userId) return;
      
        const alreadyFollowing = pic.user === currentUser.name;
        if (alreadyFollowing) return;
      
        const newFollowername = { user: currentUser.name };
        const newFollower = [...selectedProfile.followers , newFollowername]
      
        axios.patch(`https://my-json-server.typicode.com/Georgeches/friendzone/users/${userId}`, {
          followers: newFollower
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
        e.target.textContent = 'Following'
        e.target.style.color = '#7843E6'
        e.target.classList.remove('follow-btn')
      }
    }
    
    function handleComments(e, pic) {
      e.preventDefault()
      setCurrentPic(pic);
      setComments(pic.comments);
      console.log(pic.comments)
    }
    
    return (
        <div className="posts" style={mystyle}>
          {pics.map((pic) => (
            <>
            <section className="post" key={pic.id}>
              
              <div className="post-header">
                <div className="user-info">
                  {users.filter(user=>pic.user===user.name).map(post=>
                  <div className="profile-pic">
                    <img key={post.id} src={post.profile_picture} alt={pic.user} />
                  </div>
                  )}
                  <div id="pic-extra-info">
                  <h5>{pic.user}</h5>
                  <p>{pic.date}</p>
                  </div>
                </div>
                <div>
                {
                currentUser.name===undefined?
                console.log('not logged in')
                :
                users.find(user=>user.name===pic.user).name===currentUser.name?
                 console.log('your pic')
                : 
                  users.find(user=>user.name===pic.user).followers.length===0?
                  <p className="follow-btn" onClick={(e) => handleFollow(e,pic)}>Follow</p>
                  :
                  
                  users.find(user=>user.name===pic.user).followers.filter(
                    follower=>follower.user === currentUser.name
                  ).length>0?
                    <p style={{color:'#7843E6'}} onClick={e=>handleFollow(e,pic)}>Following</p>
                    :
                    <p className="follow-btn" onClick={(e) => handleFollow(e,pic)}>Follow</p>
                }
                </div>
              </div>
              <img src={pic.image} alt='pic' onDoubleClick={() => handleLikes(pic, likedPosts, setLikedPosts, setPics)}/>
              <div className="other-info">
                <div className="post-info">  
                  <p>{pic.likes} likes</p>
                  <p>{pic.comments.length} comments</p>
                </div>
                <div className="btns">
                  <button onClick={(e) => handleComments(e, pic)} data-toggle="modal" data-target="#comments-modal" className="comment-btn">Comment</button>
                  {likedPosts.includes(pic.id)?
                    <button onClick={() => handleLikes(pic, likedPosts, setLikedPosts, setPics)}>Unlike</button>
                    :
                    <button onClick={() => handleLikes(pic, likedPosts, setLikedPosts, setPics)}>Like</button>
                  }  
                </div>
              </div>
              <hr/>
            </section>
        <div className="modal fade" id="comments-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable" role="document">
              <div className="modal-content">
                <div className="modal-header">
                    <form id="comment-form">
                      <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} type="text" placeholder="Add Comment ..." />
                      <button type="button" onClick={(e) => {currentUser.name===undefined? alert("please log in first"): handleSubmit(e,pic)}}>Send</button>
                    </form>
                                        
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
            </>
          ))}

        </div>                
      );
    }

export default PostsSection;
