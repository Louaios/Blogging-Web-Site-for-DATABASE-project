import { useLoaderData } from "react-router-dom";
import AddArticle from "../components/AddArticle";
import Article from "../components/Article";
import { useContext} from "react";
import { userContext } from "../Context/UserProvider";
const Feeds = () => {
    const {user} = useContext(userContext)
    const data = useLoaderData()
     return ( <div className="feeds">
        {user.role != 1 && <AddArticle props = {{id : user.userId}}/>}
        {data.map((article,index)=>{
           return <Article key={index} props = {
                { 
                    id : article.id_article, 
                    publisher : article.publisher, 
                    title : article.title , 
                    body : article.content,
                    likes : article.likesCount,
                    comments : article.commetsCount,
                    date : article.create_date,
            }
            }/>
          })}
    </div> );
}

 
export default Feeds;

export const fetcharticles = async () =>{
  const res = await fetch("http://localhost:3000/articles");
  console.log(res)
  if(!res.ok){
    console.log(",hwvcwvx,cvwxc,bwxc")
  }else{
    return res.json();
  }
}


