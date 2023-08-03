import { useContext, useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { useUserContext } from "./userContex";
export default function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const userContext = useUserContext();
    const navigate = useNavigate();
    async function signin(ev) {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/signin", {
          method: 'POST',
          body: JSON.stringify({username, password }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        if(response.ok){
            response.json().then(userInfo =>{
                userContext.login(userInfo);
                navigate('/');
            })
        }
        else{
            alert('Wrong Credentials');
        }
    }
    return(
        <div className="signin">
            <div></div>
            <div className="signin-con">
                <h3>Login to share your Recipes</h3>
                <div className="form-con">
                    <form onSubmit={signin}>
                        <h4>Username</h4>
                        <input 
                            type="text"
                            value={username}
                            onChange={(ev) => setUsername(ev.target.value)}
                        />
                        <h4>Password</h4>
                        <input
                            type="password"
                            //   name="rpass"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                        <div> <button>Login</button> </div>
                        <div> <a href="/signup">Signup</a> </div>
                    </form>
                </div>
            </div>
            <div></div>
        </div>
    )
}