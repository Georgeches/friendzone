import React, {useState , useEffect} from "react";

function PostsSection(){
    let prefferedHeight = (window.screen.height*0.75).toString()+'px'
    let prefferedWidth = (window.screen.width*0.6).toString()+'px'
    const mystyle = {
        height: prefferedHeight,
        width: prefferedWidth
    };
    
    const [currentPic, setCurrentPic] = useState(null);
    const [users , setUsers] = useState([])
    const [videos , setVideos] = useState([])
    const [pics , setPics] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    const [commentInput, setCommentInput] = useState('');
    const[comments , setComments] = useState([])

    
  function handleSubmit() {
    if (!currentPic) return;

    const username = 'w'; 
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
                    <img key={post.id} src={post.profile_picture} alt={pic.user} />
                  )}
                  <h5>{pic.user}</h5>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
              <div className="image">
                <img className="img-responsive" height="400" src={pic.image} alt='pic' onDoubleClick={() => handleLikes(pic, likedPosts, setLikedPosts, setPics)}/>
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