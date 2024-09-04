import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../Context/UserProvider";


const Comment = ({props}) => {
    const {user} = useContext(userContext)
    const {id , by , article , content , commentateur} = props;

   const handleDeletecom = async ()=>{
    if(window.confirm('are u sure that u want to delete this comment ?')){
    const res = await fetch(`http://localhost:3000/comments/delete/${id}` , {
        method : 'DELETE',
        headers : {
            'Content-Type': 'application/json',
        }
    })
    if(!res.ok){
        throw new Error('something went wrong when deleting ur comment')
    }else{
        return 0;
    }
}
   }

    return ( 
        <div className="co">
            <Link to={`/profile/${commentateur}`}>
            <div className="profile">
                <img src="../pics/yami.webp" alt="notif" />
            </div>
            </Link>
            <div className="comt">
                <div style={{
                    display : 'flex',
                    gap : '20px',
                    justifyContent : 'space-between',
                }}>
                <Link to={`/profile/${commentateur}`}><h4>{commentateur}</h4></Link>
                {user.userId == by && <button className="report" onClick={handleDeletecom} style={{
                    padding :'3px 5px',
                    alignSelf : 'flex-end',
                    borderRadius : '30%'
                }}>X</button>}
                </div>
                <p>{`${content}`}</p>
            </div>
        </div>
     );
}
 
export default Comment;