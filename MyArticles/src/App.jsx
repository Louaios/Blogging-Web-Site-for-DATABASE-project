import { Route, RouterProvider, createBrowserRouter, createRoutesFromChildren} from "react-router-dom"
import LoginPage, { postLogin } from "../layouts/LoginPage"
import SignupPage, { postSignup } from "../layouts/SignupPage"
import HomePage from "../layouts/HomePage"
import Error from "../layouts/Error"
import Profile from "../layouts/Profile"
import Feeds, { fetcharticles } from "../layouts/Feeds"
import ArticleDetails, { fetchComments } from "../layouts/ArticleDetails"
import Search, { fetchSearch } from "../layouts/Search"
import AdminPage from "../layouts/AdminPage"
import AdminUsers, { fetchUsers } from "../layouts/AdminUsers"
import UserProvider from "../Context/UserProvider"
import LikedArticles from "../layouts/LikedArticles"
import Settings from "../layouts/Settings"
import ReportedArticles,{fetchReported} from "../layouts/ReportedArticles"

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/">
     <Route path="login" element = {<LoginPage />} action={postLogin}/>
     <Route path="signup" element = {<SignupPage />} action={postSignup}/>
     <Route path="admin" element = {<AdminPage />}>
        <Route index element = {<AdminUsers />} loader={fetchUsers}/>
        <Route path="articles" element = {<Feeds/>} loader={fetcharticles}/>
        <Route path="reported" element = {<ReportedArticles />} loader={fetchReported}/>
     </Route>
     <Route path="/" element = {<HomePage />} >
         <Route index element={<Feeds />} loader={fetcharticles} errorElement = {<Error />}/>
         <Route path="likedarticles" element = {<LikedArticles />} />
         <Route path="settings" element = {<Settings />} />
         <Route path="profile/:username" element = {<Profile />} />
         <Route path="article/:id" element = {<ArticleDetails />} loader={fetchComments}/>
         <Route path="search/:content" element = {<Search />} loader={fetchSearch}/>
     </Route>
    </Route>
  )
)
function App() {  
 return (
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
  )
}

export default App
