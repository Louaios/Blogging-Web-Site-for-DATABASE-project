import { useLoaderData, useParams } from "react-router-dom";
import Sprofile from "../components/Sprofile";

const Search = () => {
    const users = useLoaderData()
    const {content} = useParams()
    return ( 
        <div className="spage">
          {users.length > 0 ? 
          users.map((profile , index) => (
            <Sprofile key={index} props = {{
              id_user : profile.id_user,
              username : profile.username,
              email : profile.email,
              gendre : profile.gendre,
              joinDate : profile.joinDate,
              bio : profile.bio
              }}/>
          ))
          : <div style={{textAlign : "center"  , marginTop : '200px'}}>
            <h1 className="violet">USER NOT FOUND !</h1>
            <p>{`seems like there is no user with username : "${content}" you can try again with correct name !`}</p>
            </div>
            }
        </div>
     );
}
 
export default Search;


export const fetchSearch = async ({params}) =>{
  const {content} = params;
  const res = await fetch("http://localhost:3000/usersearch/"+content);
  if(!res.ok){
  const error = await res.json().error;
  throw new Error(error)
  }else{
  return res.json()
  }
}