import { useState } from "react";
import {Link , Outlet  , NavLink} from "react-router-dom"
const AdminPage = () => {
    const [isactive , setIsactive] = useState(true)
    const handleClick = () =>{
        setIsactive(false)
    } 
    return ( 
        <div className="admin">
            <aside>
                <h1><span className="violet">MY</span>ARTICLES</h1>
                <ul>
                    <Link to="/admin" onClick={()=>{
                        setIsactive(true)
                    }} className={isactive ? 'active' : ''}><li>USERS</li></Link>
                    <NavLink onClick={handleClick} to="/admin/articles"><li>ARTICLES</li></NavLink>
                    <NavLink to= "/admin/reported" onClick={handleClick}><li>REPORTED ARTICLES</li></NavLink>
                    <Link className="logout" to="/login"><li>LOG OUT</li></Link>
                </ul>
            </aside>
            <main>
                <Outlet />
            </main>
        </div>
     );
}
 
export default AdminPage;