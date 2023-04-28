function PostsSection(){
    let prefferedHeight = (window.screen.height*0.75).toString()+'px'
    let prefferedWidth = (window.screen.width*0.6).toString()+'px'
    
    const mystyle = {
        height: prefferedHeight,
        width: prefferedWidth
    };
    return(
        <div className="posts" style={mystyle}></div>
    )
}

export default PostsSection;