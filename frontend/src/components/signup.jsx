import { useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { useUserContext } from "./userContex";

export default function Signup() {
  const navigate = useNavigate();
  const userContext = useUserContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/signup", {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if(response.ok){
      navigate('/');
      
    }
  }
  return (
    <div className="signin">
      <div></div>
      <div className="signin-con">
        <h3>Signup to share! </h3>
        <div className="form-con">
          <form onSubmit={register}>
                <h4>Email</h4>
                <input
                    type="email"
                    //   name="remail"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <h4>Username</h4>
                <input
                    type="text"
                    //   name="rname"
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
                <div>
                <button>Register</button>
                </div>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
}
