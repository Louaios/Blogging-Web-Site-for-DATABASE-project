import { useContext, useEffect, useState } from "react"; 
import {userContext} from '../Context/UserProvider'
import {redirect} from 'react-router-dom'

const Settings = () => {
    const {user} = useContext(userContext);
    const [username , setUsername] = useState('')
    const [email , setEmail] = useState('')
    const [bio ,  setBio] = useState('')

    const getData = async () =>{
        const res = await fetch(`http://localhost:3000/user/${user.userId}`)
        if(!res.ok){
            throw new Error("something went wrong :(")
        }else{
            const data = await res.json()
            console.log(data)
            setUsername(data.username)
            setBio(data.bio) 
            setEmail(data.email)
            }
    }
 
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const res = await fetch(`http://localhost:3000/updatebio/${user.userId}` , {
            method : 'PUT' ,
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                Bio : bio,
                username : username,
                email : email,
            })
        }) 
        if(!res.ok){
            throw new Error("something went wrong")
        }else{
            return redirect("/");
        }
    }

    useEffect(()=>{
        getData()
    }, [])
    return ( 
        <div className="settings" style={{ margin : '0px 20px'}}>
            <h1>Account Settings :</h1>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor="username">Username :</label>
                <input type="text" id="username" name="username" required value={username} onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>
                <label htmlFor="email">Email :</label>
                <input type="email" id="email" name="email" required value={email} onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <label htmlFor="bio">Bio :</label>
                <textarea name="bio" id="bio" cols="30" rows="10" value={bio} onChange={(e)=>{
                    setBio(e.target.value)
                }}></textarea>
                <div style={{
                    display : "flex",
                    alignItems : "center",
                    justifyContent : "flex-end",
                    gap : '20px'
                }}>
                    <button type="submit">submit</button>
                </div>
            </form>
        </div>
     );
}
 
export default Settings;