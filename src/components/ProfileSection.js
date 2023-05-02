function ProfileSection(){
    let prefferedHeight = (window.screen.height*0.75).toString()+'px'
    let prefferedWidth = (window.screen.width*0.3).toString()+'px'
    
    const mystyle = {
        height: prefferedHeight,
        width: prefferedWidth
    };
    return(
        <div className="profile" style={mystyle} width={prefferedWidth}></div>
    )
}

export default ProfileSection;