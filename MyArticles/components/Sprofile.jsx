import { Link } from "react-router-dom";
import { userContext } from "../Context/UserProvider";
import { useContext } from "react";
const Sprofile = ({props}) => {
   const {user} = useContext(userContext);
   const {id_user , username , email , gendre , joinDate , bio} = props
    return ( 
      <div style={{
         display : "flex",
         justifyContent : 'flex-start',
         alignItems : 'flex-start',
         width : '95%',
         margin : '20px'
      }}>
      <Link style={{flex : '1'}} to={`/profile/${username}`}>
        <div className="sprofile">
           <div className="prpic">
              <img src="../pics/yami.webp" alt="notif" />
           </div>
           <div>
           <h2>{username}</h2>
           <p style={{fontSize : '14px'}}>member since : <span className="violet">{joinDate}</span></p>
           </div>
        </div>
      </Link></div>
     );
}
 
export default Sprofile;