import { useState } from "react";

const PopUpModify = ({props}) => {
    const {onclose , id , title , content} = props;
    const [mtitle ,setMtitle] = useState(title)
    const [mcontent ,setMcontent] = useState(content)

   const HandleSubmit = async (e)=>{
    e.preventDefault()
    const res = await fetch(`http://localhost:3000/articles/${id}` , {
        method : 'PUT',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            title : mtitle,
            content : mcontent,
        })
    })
    if(!res.ok){
        throw new Error("something went wrong when updating the article")
    }else{
        onclose(false)
        return 0;
    }
   }


    return ( 
        <div className="pop">   
        <h1 className="violet">Modify Article :</h1>
          <form method="post">
            <label htmlFor="title">Title :</label>
            <input type="text" name="title" id="title" value={mtitle} onChange={(e)=>{
                setMtitle(e.target.value)
            }} required/>
            <label htmlFor="content">Content :</label>
            <textarea required name="content" id="content" cols="30" rows="10"value={mcontent} onChange={(e)=>{
                setMcontent(e.target.value)
            }}></textarea>
            <div className="modifyactions" style={{
                display : 'flex',
                gap : '10px',
                justifyContent : 'flex-end',
                alignItems : 'center',
            }}>
                <button type="submit" onClick={HandleSubmit}>modify</button>
                <button type="reset" onClick={()=>{
                    setMtitle("")
                    setMcontent("")
                }}>reset</button>
                <button onClick={()=>{
                    onclose(false)
                }}>close</button>
            </div>
          </form>
        </div>
     );
}
 
export default PopUpModify;