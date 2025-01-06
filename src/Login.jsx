import React, {useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate} from 'react-router-dom';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async() => {
        try{
            const response = await axios.post("https://szallasjwt.sulla.hu/login", {username, password})
            const token = response.data.token;
            localStorage.setItem("jwt",token);
            navigate('/SzallasList');
        }
        catch(error){
            setError("Hitelesítés sikertelen. Ellenőrizd a bejelentkezési adatokat!")
            console.error("Hiba a bejelentkezés során: ",error)
        }
    }

return (
    <div className="p-5" style={{ backgroundColor: "rgb(240, 239, 233)", minHeight:"100vh"}}>
    <div className="p-5" style={{backgroundColor: "rgb(228, 214, 202)", borderRadius:"2rem", margin:"auto", display: "block", height:"30rem", width:"30%"}}>
        <h2 style={{textAlign: "center"}}>Bejelentkezés</h2><br />
        {error && <p style={{color : "red"}}>{error}</p>}
        <p style={{textAlign: "center"}}>Felhasználónév:</p>
        <input type='text' placeholder='Felhasználónév' value={username} onChange={(e) => setUsername(e.target.value)}
        style={{borderRadius:"0.8rem", margin:"auto", marginBottom:"1rem", backgroundColor: "rgb(200, 255, 255, 0.5)", width: "80%", height:"2.5rem", display:"block"}}/> <br />
        <p style={{textAlign: "center"}}>Jelszó:</p>
        <input type='password' placeholder='Jelszó' value={password} onChange={(e) => setPassword(e.target.value)}
        style={{borderRadius:"0.8rem", margin:"auto", backgroundColor: "rgb(200, 255, 255, 0.5)", width: "80%", height:"2.5rem",display:"block"}}/><br />
        <button onClick={handleLogin} className='btn btn-success' style={{margin:"2rem auto", height:"3rem", width:"10rem", display:"block"}}>Bejelentkezés</button>
    </div>
    </div>
);

}
