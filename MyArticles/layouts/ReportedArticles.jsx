import { useLoaderData } from "react-router-dom";
import Article from "../components/Article";

const ReportedArticles = () => {
    const articles = useLoaderData()
    return ( 
        <div style={{
            margin :'20px'
          }}>
     <h1 className="violet">Reported Articles :</h1>
     {
        articles.map((article , index) => (
            <Article key={index} props={
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
        ))
     }

        </div>    
     );
}
 
export default ReportedArticles;


export const fetchReported = async ()=>{
    const res = await fetch(`http://localhost:3000/report`);
    if(!res.ok){
        throw new Error('something went wrong !')
    }else{
        return res.json()
    }
}