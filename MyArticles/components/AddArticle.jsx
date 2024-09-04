import { useState } from "react";

const AddArticle = ({props}) => {
    const {id} = props;
    const [title , setTitle] = useState()
    const [content , setContent] = useState()
    const handleSubmit = async (e)=>{
            e.preventDefault()
            const post = {
                title : title,
                content : content,
                publisher : id,
                        }
            const res = await fetch("http://localhost:3000/articles" ,  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            })
            if(!res.ok){
                throw new Error("erorororororo")
            }else{
                setTitle('')
                setContent('')
                return res.json()
            }
       }
    return ( 
        <div className="add">
            <h3><span className="violet">Share some articles</span> with the world !</h3>
            <form method="post" onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Article title :" required value={title} onChange={(e)=>{
                    setTitle(e.target.value)
                }}/>
                <textarea name="content" value={content} onChange={(e)=>{
                    setContent(e.target.value)
                }} cols="30" rows="7" placeholder="Content......." required></textarea>
                <div>
                <button type="submit" style={{margin : '2px 10px 2px 0px' , padding : '5px 10px'}}>Post</button>
                <button type="reset" style={{margin : '2px 10px' ,  padding : '5px 10px'}}>Reset</button>
                </div>
            </form>
        </div>
     );
}
 
export default AddArticle;