import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../Context/UserProvider";

const HomePage = () => {
    const {user , dispatch} = useContext(userContext)
    const navigate = useNavigate()
    const [search , setSearch] = useState('')
    return ( 
        <div className="home">
            <header className="main">
                <Link to="/"><h1><span className="violet">MY</span>ARTICLES</h1></Link>
                <div className="search">
                <div className="srch" onClick={()=>{
                    if(search.length > 0 && search.trim() != "")  
                    {navigate(`/search/${search}`)
                     setSearch('') 
                    }
                    else{
                    setSearch('')
                    document.getElementById('search').focus();
                    }
                }}>
                        <img src="../pics/srch.png" alt="notif" />
                </div>
                <form method="post" onSubmit={(event) => {
                    event.preventDefault()
                    if(search.trim() != ""){
                    navigate(`/search/${search}`)
                    setSearch('') }
                    else{
                        setSearch('')
                        document.getElementById('search').focus();
                    }
                }}>
                <input type="text" name="search" id="search"  value = {search} onChange={(r)=>{
                    setSearch(r.target.value)
                }} placeholder="search by username :"/>
                </form>
                </div>
                <div className="sidebar">
                    <Link to="/likedarticles">
                    <div className="notif">
                        <img src="../pics/notification.png" alt="notif" />
                    </div>
                    </Link>
                    <Link to={`/settings`}>
                    <div className="notif">
                        <img src="../pics/msg.png" alt="notif" />
                    </div>
                    </Link>
                    <Link to={`/profile/${user.username}`}>
                    <div className="profile">
                        <img src="../pics/yami.webp" alt="notif" />
                    </div>
                    </Link>
                </div>
            </header>
            <div className="bodypage">
               <Outlet /> 
            </div>
        </div>
     );
}
 
export default HomePage;