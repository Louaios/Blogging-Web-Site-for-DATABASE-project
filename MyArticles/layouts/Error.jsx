import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError()
    return ( <div className="error">
        <h1 className="violet">OOOPS SOMETHING WENT WRONG !</h1>
        <p>{error.message || error.statusText}</p>
    </div> );
}
 
export default Error;