import { useFetcher , Link, redirect } from "react-router-dom"; 
import {jwtDecode} from "jwt-decode";
import { useContext, useEffect } from "react";
import { userContext } from "../Context/UserProvider";

const LoginPage = () => {
    const fetcher = useFetcher()
    const fetcherstate = fetcher.state;
    const {user , dispatch} = useContext(userContext)
    useEffect(()=>{
        dispatch({type : "AUTH"})
        console.log(user)
    } , [fetcherstate])
    return ( 
        <div className="login">
            <div className="log">
                <h1>WELCOME TO <span className="violet">MYARTICLES</span></h1>
            <div className="welcome">
                <h1>Log in to your account !</h1>
                <p>welcome back please enter your details :</p>
            </div>
            <fetcher.Form method="post" className="form">
                <label htmlFor="username">Username :</label>
                <input type="text" name="username" id="username" required/>
                <label htmlFor="password">Password :</label>
                <input type="password" required id="password" name="password" />
                <button type="submit">Log in</button>
            </fetcher.Form>
            <div className="signup">
                <p>You don't have an account ? <Link className = "aa" to="/signup">Sign up !</Link></p>
            </div>
            </div>   
          <img src="../pics/pic1.png" alt="pic"/>
        </div>
     );
}
 
export default LoginPage;



export const postLogin = async ({request}) => {
    const data = await request.formData()

    const userr = {
        username : data.get('username'),
        password : data.get('password'),
    }
    const res = await fetch("http://localhost:3000/login" , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userr),
     });
     if(!res.ok){
        const error = await res.json();
        console.log(error.error)
        throw new Error(error.error)
     }else{
        const token = await res.json();
        const user = jwtDecode(token.token)
        localStorage.setItem('user',JSON.stringify([user]))
        if(user.role == 1){
            return redirect ('/admin');
        }else{
            return redirect ('/');
        }
        
        
     }
}