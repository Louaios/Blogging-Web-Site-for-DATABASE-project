import { useFetcher , Link, redirect } from "react-router-dom";
const SignupPage = () => {
    const fetcher = useFetcher()
    return ( 
        <div className="login">
            <div className="log">
            <h1>WELCOME TO <span className="violet">MYARTICLES</span></h1>
            <div className="welcome">
                <h1>Create Account here !</h1>
                <p>welcome to myarticles family please enter your details :</p>
            </div>
            <fetcher.Form method="post" className="form">
                <label htmlFor="username">Username :</label>
                <input type="text" name="username" id="username" required/>
                <label htmlFor="email">Email :</label>
                <input type="email" name="email" id="email" required/>
                <label htmlFor="password">Password :</label>
                <input type="password" required id="password" name="password" />
                <label htmlFor="gender">Gender :</label>
                <select name="gender" id="gender">
                    <option value={`${1}`}>male</option>
                    <option value={`${2}`}>female</option>
                </select>
                <button type="submit">Create Account !</button>
            </fetcher.Form>
            <div className="signup">
                <p>You do have an account ? <Link className = "aa"  to= "/login">Log in !</Link></p>
            </div>
            </div>   
          <img src="../pics/pic1.png" alt="pic"/>
        </div>
     );
}
 
export default SignupPage;



export const postSignup = async ({request}) => {
 const data = await request.formData();
 const user = {
    username : data.get('username'),
    email : data.get('email'),
    password : data.get('password'),
    gendre : data.get('gender'),
    role : 2,
 }
 const res = await fetch("http://localhost:3000/register" , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
 })
 if(!res.ok){
    throw new Error("erroooooor")
 }else{
    console.log("registration successfuly")
    return redirect("/login");
 }

}