import {useLoaderData} from "react-router-dom"
import Sprofile from "../components/Sprofile";
import { useContext } from "react";
import { userContext } from "../Context/UserProvider";
const AdminUsers = () => {
   const {user} = useContext(userContext)
    const users = useLoaderData()
    return ( 
        <div className="users">
         <h1 className="violet" style={{padding : '20px 20px 0 20px'}}>ALL USERS :</h1>
         {
            users.map((profile, index)=>(
               <div key={index} style={{
                  display : 'flex',
                  justifyContent : 'flex-start',
                  alignItems : 'center',
               }}> 
            <Sprofile props = {{
               id_user : profile.id_user,
               username : profile.username,
               email : profile.email,
               gendre : profile.gendre,
               joinDate : profile.joinDate,
               bio : profile.bio
               }} />
               {user.role == 1 && <button style={{ backgroundColor :'red' ,borderRadius : '0px 50px 50px 0px' , padding : "45px 5px" , marginLeft : '-20px'
             , 
            }} onClick = { async (e)=>{
               
               e.preventDefault()
               if(!window.alert("are you sure you want to delete this user ?")){
               const res = await fetch(`http://localhost:3000/delete/${profile.id_user}`,{
                  headers: {
                     'Content-Type': 'application/json',
                 },
                  method : 'DELETE'
               })
               if(!res.ok){
                  throw new Error("something went wrong")
               }else{
                  window.location.reload()
               }
            }
            }} >X</button>}
               </div>
            ))
         }
        </div>
     );
}
 
export default AdminUsers;

export const fetchUsers = async ()=>{
   const res = await fetch(`http://localhost:3000/users`)
   if(!res.ok){
      throw new Error("something went wrong")
   }else{
      return res.json()
   }

}