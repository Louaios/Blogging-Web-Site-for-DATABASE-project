import { useParams } from "react-router-dom";
import Article from "../components/Article";
import AddArticle from "../components/AddArticle";
import { useContext, useEffect, useState} from "react";
import { userContext } from "../Context/UserProvider";

const Profile = () => {
    const {username} = useParams()
    const {user} = useContext(userContext)
    const [articles , setArticles] = useState([])
    const [data, setData] = useState()

    const fetchProfile = async () => {
      const res = await fetch("http://localhost:3000/username/"+username);
      if(!res.ok){
        throw new Error(await res.json().error)
      }else{
        const data = await res.json()
        setData(data)
        const restwo = await fetch(`http://localhost:3000/articles/${data?.id_user}`)
        if(!restwo.ok){
          throw new Error(await restwo.json().error)
        }else{
          const data = await restwo.json()
          setArticles(data)
        }
      }
    }
    useEffect(() =>{
     fetchProfile()
    } ,[]) 
    const isUser = user.userId == data?.id_user;
    
    return ( 
        <div className="publisher" style={{margin : '20px'}}>
          <header>
            <div className="bgimg" />
            <div className="info">
            <div>
              <h2>{data?.username}</h2>
              <p style={{fontSize : '14px'}}>member since : <span className="violet">{data?.joinDate}</span></p>
           </div>
           
          {data?.bio && <div className="bio">
            <label htmlFor="bio">Biography :</label>
              <textarea name="bio" id="bio" readOnly defaultValue={data?.bio}></textarea>
           </div>}
          
           
           </div>

          </header>
          {isUser && <AddArticle props = {{id : data?.id_user}} />}
          <div className="articles">
            {articles.length > 0 && articles.map((article , index)=>(
                <Article  key = {index} props = {
                    {
                        id : article.id_article , 
                        publisher : article.publisher, 
                        title : article.title, 
                        body : article.content,
                        likes : article.likesCount,
                        comments : article.commetsCount,
                        date : article.create_date,
                    }
                }/>
            )) }
          </div>
        </div>
     );
}
 
export default Profile;






