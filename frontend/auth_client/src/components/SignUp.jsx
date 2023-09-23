import '../App.css'
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const SignUp = function () {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const navigate = useNavigate()
  
  const handleSignUp = async () => {    
      const formData = new FormData();
      formData.append('file', file);

      console.log(file)
      await axios.post("http://localhost:3001/auth/register", {
        username: username,
        email: email,
        password: password,
        profilePicture: file.name,
      }, { withCredentials: true })

      await axios.post("http://localhost:3001/file/upload", formData, { 
        headers: {'Content-Type': 'multipart/form-data' , withCredentials: true}})

      navigate("/signin")
    };
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setFile(file)
    }
  };

  return (
      <div className="LoginForm">
        <h1>Sign Up</h1>
        <input
          required
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button onClick={() => (navigate("/signin"))}>Sign In</button>
        <button onClick={handleSignUp}>Sign Up</button>
        <div>
    <input
      type="file"
      accept=".jpg, .jpeg, .png"
      onChange={handleImageChange}
      style={{ display: 'none' }}
      id="imageInput"
    />
    <label htmlFor="imageInput" style={{ cursor: 'pointer',color: "white"}}>
      <h4>Select Profile Picture</h4>
    </label>
    {selectedImage && (
      <div>
        <h2></h2>
        <img src={selectedImage} alt="Seçilen Resim" style={{ maxWidth: '100%' }} />
        <h3>You look so impressive {username}!</h3>
      </div>
    )}
  </div>
      </div>
  )
}

export default SignUp
