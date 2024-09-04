import Sprofile from "./Sprofile";

const PopUp = ({props}) => {
    const {onclose , userslist} = props;
    return ( 
        <div className="pop">
        <div style={{display : "flex" , justifyContent : 'space-between' ,alignItems : 'center'}}>
         <h1 className="violet">{`${userslist.length} LIKE :`}</h1>
         <button onClick={()=>{
         onclose(false)
         }}>X</button>
         </div>
         {userslist.length > 0 ? <div>
          {userslist.map(user=>(
            <Sprofile key = {user.id_user} props={{
                id_user : user.id_user, 
                username : user.username ,
                 email : user.email , 
                 gendre : user.gendre,
                  joinDate : user.joinDate,
                   bio : user.bio
                }
            }/>
          ))}
         </div> :
         <div>
            <p>No one likes this article yet</p>
         </div>
         }
        </div>
     );
}
 
export default PopUp;