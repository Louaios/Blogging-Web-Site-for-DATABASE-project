import { useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { userContext } from "../Context/UserProvider";
import PopUpModify from "./PopUpModify";
import PopUp from './PopUp'

const Article = ({props}) => {
    const [likeslist , setLikeslist] = useState()
    const [popup , setPopup] = useState(false)
    const [username , setUsername] = useState("")
    const {id , publisher , title , body , likes , comments , date} = props;
    const {user} = useContext(userContext)
    const isuser = user.userId == publisher;
    const isadmin = user.role == 1;
    const [likeit , setLikeit] = useState()
    const [modify , setModify] = useState(false)


    
    const getusername = async ()=>{
        const res = await fetch(`http://localhost:3000/user/${publisher}`)
        if(!res.ok){
            throw new Error("blalall")
        }else{
            const data = await res.json();
            setUsername(data.username)
        }
    }

    const getLikes = async ()=>{
    const res = await fetch(`http://localhost:3000/likes/${id}`);
    if(!res.ok){
        throw new Error('errrorororororo')
    }else{
        const data = await res.json()
        setLikeslist(data)
    }
    }


    

    const isLiked = async ()=>{
        const res = await fetch(`http://localhost:3000/veriflike/${id}/${user.userId}`)
        if(!res.ok){
            throw new Error(await res.json().error)
        }else{
          const data = await res.json()
          setLikeit(data.length > 0)
        }
    }

    useEffect(()=>{
        getLikes();
        getusername();
        isLiked();
    }, [])
    
    
    const handleLike = async (e)=>{
        e.preventDefault()
        const likeinfo = {
            liked_by : user.userId , 
            article_liked : id,
        }
        
        if(likeit){
        const res = await fetch(`http://localhost:3000/delete-like` , {
            method : 'DELETE' , 
            headers : {
            'Content-Type': 'application/json',    
            },
            body : JSON.stringify(likeinfo),
        })
        if(!res.ok){
            throw new Error("blablabla")
        }else{
            setLikeit(false)
            return res.json()
        }
        
        }else{
        const res = await fetch(`http://localhost:3000/add-like` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(likeinfo),
        })
        if(!res.ok){
            throw new Error("blablabla")
        }else{
            setLikeit(true)
            return res.json()
        }
        }
    }


    const handleReport = async (e)=>{
           e.preventDefault()
           if(window.confirm("are u sure u want to report about this article ?")){
            const res = await fetch(`http://localhost:3000/report/${user.userId}` , {
                method : 'POST' , 
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({articleId : id})
            })
            if(!res.ok){
                throw new Error("something went wrong !")
            }else{
                return 0;
            }
           }
    }


    const handleDeleteArticle = async ()=>{
        if(window.confirm("are u sure u want to delete this article ?")){
            const res = await fetch(`http://localhost:3000/articles/${id}` , {
            method : 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },})
            if(!res.ok){
                throw new Error("bllblblbbl")
            }else{
             return 0;
            }
        }
    }

    return ( 
    <div className="article">
        <div className="publisherrr">
             <Link  to={`/profile/${username}`} >
              <div className="about">
                <div style={{display : "flex" , gap : '10px' , alignItems : 'center'}}>
                    <div className="profilee">
                        <img src="../pics/yami.webp" alt="notif" />
                    </div>
                    <div><h4>{username}</h4>
                    <p style={{fontSize : '8px' , color : '#ffffff88'}}>{date}</p></div>
                </div>
             </div>
             </Link>
             { (isuser && !isadmin) && <button onClick={()=>{
                setModify(true)
             }} className="modify">modify</button>}
             </div>
             <div className="content" style={{margin : '0px 10px'}}>
                <h1>{title}</h1>
                <p style={{fontSize : '11px' , marginBottom : '10px'}}>{body}</p>
             </div>
             <div className="actions">
                <div style={{display : 'flex' , justifyContent : 'flex-start' , alignItems :'center' , gap : '10px'}}>
                    <div className="like" >
                        {!isadmin && <button onClick ={handleLike} style={likeit ? {backgroundColor :'red'} :{backgroundColor : '#BA68C8'} } className="likeit">
                            {likeit ? "liked" : "like it!"}
                        </button>}
                        <button className = "likeit"  onClick={()=>{
                            setPopup(true)
                        }}>
                        <p>{`${likes} like`}</p>
                    </button>

                    </div>
                <Link to ={`/article/${id}`} className="comment">
                    <p>{`${comments} comment`}</p>
                    
                </Link></div>
                {(isuser || isadmin) ? <button className="report" onClick={handleDeleteArticle}>delete</button> : 
                
                <button className="report" onClick={handleReport}>report</button> }
                
             </div>
             {popup && <PopUp props={{
                onclose : setPopup,
                userslist : likeslist, 
             }}/>}
             {modify && <PopUpModify props={{
                onclose : setModify,
                id : id,
                title : title,
                content : body,
             }}/>}
    </div> );
}
 
export default Article;


