import { useLoaderData, useParams } from "react-router-dom";
import Article from "../components/Article";
import Comment from "../components/Comment";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../Context/UserProvider";

const ArticleDetails = () => {
    const {id} = useParams();
    const comments = useLoaderData()
    const {user} = useContext(userContext)
    const [comment , setComment] = useState("")
    const [udata, setUdata] = useState([])

    const getUserData = async () =>{
        const res = await fetch(`http://localhost:3000/article/${id}`)
        if(!res.ok){
            throw new Error('something went wrong')
        }else{
            const data = await res.json();
            setUdata(data)
        }
    }


    const handleComment = async (e)=>{
        e.preventDefault()
        const commentinfo = {
            comment_by : user.userId,
            article_comment : id,
            comment_content : comment,
        }
        const res = await fetch(`http://localhost:3000/add-comment`,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentinfo),
        });
        if(!res.ok){
            throw new Error("hahahahaha")
        }else{
        setComment('')
        return res.json()
        }
    }

    useEffect(()=>{
        getUserData();
        } , [])


    return ( 
        <div className="artdetails" style={{margin : '20px'}}>
            
            {udata.length > 0 && (
      <Article
        props={{
          id: udata[0]?.id_article,
          publisher: udata[0]?.publisher,
          title: udata[0]?.title,
          body: udata[0]?.content,
          likes: udata[0]?.likesCount,
          comments: udata[0]?.commetsCount,
          date: udata[0]?.create_date,
        }}
      />
    )}
            <div className="comments" style={{backgroundColor : 'rgba(255, 255, 255, 0.068)' , padding : '20px'}}>
             <div className="addcomment">
                <h2 style={{marginBottom : '5px'}}>Add Comment :</h2>
                <form method="post" onSubmit={handleComment}
                style={{
                    display : "flex" ,
                    flexDirection : 'column',
                    gap : '10px'
                    }}>
                  <input type="text" required name="comment" value={comment} onChange={(e)=>{
                    setComment(e.target.value);}}  placeholder="add a comment :"/>
                    <div style={{alignSelf : 'end'}}>
                    <button type="submit" style={{marginRight : '10px'}}>add</button>
                    <button type="reset">reset</button>
                    </div>
                </form>
             </div>
             <h4>{`Comments (${comments.length}) :`}</h4>
            {comments.length > 0 && comments.map(comment =>(
                <Comment props = {{ 
                    id : comment.comment_id ,
                    by : comment.comment_by,
                    article : comment.article_comment,
                    content : comment.comment_content,
                    commentateur : comment.commentateur,
                }
                } key={comment.comment_id}/>
            ))}
            </div>
        </div>
            );
}
 
export default ArticleDetails;


export const fetchComments = async ({params}) =>{
    const {id} = params;
    const res = await fetch(`http://localhost:3000/comments/${id}`);
    if(!res.ok){
        throw new Error("there is something wrong with it")
    }else{
        return res.json()
    }

}