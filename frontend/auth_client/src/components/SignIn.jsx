import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSignIn = async () => {
        await axios.post("http://localhost:3001/auth/login", {
          email: email,
          password: password,
        }, { withCredentials: true })
        .then (async () => {
            const response = await axios.get("http://localhost:3001/auth/user/" + email, {
              withCredentials: true
          })
          localStorage.setItem("loggedInUser", response.data.username)
          localStorage.setItem("loggedInUserId", response.data._id)
          localStorage.setItem("loggedInUserProfilePicture", response.data.profilePicture)
          navigate("/")
        })
        .catch (function (err) {
          console.log(err)
        })
    }

    return (
        <div className="LoginForm">
          <h1>Sign In</h1>
          <input 
            required
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => (navigate("/signup"))}>Sign Up</button>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
    )
}
 
export default SignIn