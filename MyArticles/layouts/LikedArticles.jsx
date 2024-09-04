import { useContext, useEffect, useState } from "react";
import { userContext } from "../Context/UserProvider";
import Article from "../components/Article";

const LikedArticles = () => {
    const {user} = useContext(userContext);
    const [articles , setArticles] = useState()
    const fetchLiked = async () => {
        const res = await fetch(`http://localhost:3000/likes/liked/${user.userId}`)
        if(!res.ok){
            throw new Error("erooor")
        }else{
            const data = await res.json()
            setArticles(data);
        }
    }
    useEffect(()=>{
        fetchLiked()
    } , [])

    return ( <div className="feeds">
        <h1 className="violet">YOUR LIKED ARTICLES :</h1>
        {
            articles?.map(article=>(
                <Article  key = {article.id_article} props={{
                    id : article.id_article, 
                    publisher : article.publisher,
                    username : article.username, 
                    title : article.title , 
                    body : article.content,
                    likes : article.likes,
                    comments : article.commets,
                    date : article.create_date,
                }}/>
            ))
        }
    </div>);
}
 
export default LikedArticles;