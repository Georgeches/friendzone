import React, {useState , useEffect} from "react";

function PostsSection({currentUser, users, pics, setPics ,comments ,setComments}){
    let prefferedHeight = (window.screen.height*0.75).toString()+'px'
    let prefferedWidth = (window.screen.width*0.5).toString()+'px'
    const mystyle = {
        height: prefferedHeight,
        width: prefferedWidth
    };
    
    const [currentPic, setCurrentPic] = useState(null);
    const [likedPosts, setLikedPosts] = useState([])
    const [commentInput, setCommentInput] = useState('');

    
  function handleSubmit() {
    if (!currentPic) return;

    const username = currentUser.name; 
    const newComment = { user: username, comment: commentInput }; 
    setComments([...comments, newComment]);
    setCommentInput('');
    console.log(username);

    fetch(`http://localhost:4000/pictures/${currentPic.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comments: currentPic.comments.concat(newComment) }),
    });
  }


    function handleLikes(pic, likedPosts, setLikedPosts, setPics) {
      if (likedPosts.includes(pic.id)) {
        alert('You already Liked')
        return; 
      }
      
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
    
      fetch(`http://localhost:4000/pictures/${pic.id}` , {
        method : 'PATCH',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({ likes: pic.likes + 1 })
      })
    }
    
    function handleComments(pic) {
      setCurrentPic(pic);
      setComments(pic.comments);
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
                <button className="follow-btn">Follow</button>
              </div>
              <div className="image">
                <img className="img-responsive" height="300" src={pic.image} alt='pic' onDoubleClick={() => handleLikes(pic, likedPosts, setLikedPosts, setPics)}/>
              </div>
              <div className="other-info">
                <div className="post-info">  
                  <p>{pic.likes} likes</p>
                  <p>{pic.comments.length} comments</p>
                </div>
                <div className="btns">
                  <button onClick={() => handleComments(pic)} data-toggle="modal" data-target="#comments-modal" className="comment-btn">Comment</button>
                  <button onClick={() => handleLikes(pic, likedPosts, setLikedPosts, setPics)}>Like</button>
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
                      <button type="button" onClick={() => handleSubmit(pic)}>Send</button>
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
