import React, {useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
// import user from '../MockData/MockData';
import logo from '../Images/logo_480.png';
// import userLogin from '../APICalls/APICalls';
import './Login.css';
import Header from '../Header/Header';


const Login: React.FC = () => {
    const [userName, setUsername] = useState<string | null> ('');
    const [password, setPassword] = useState<string | null>('');
    const [loginFail, setLoginFail] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    
    const navigate = useNavigate();

//function to handle submit
    const handleLogin = async (event) => {
        event.preventDefault();
        const loginData = {
            username: userName,
            password: password
        };
        try{
           const response = await fetch("https://weather-together-be.onrender.com/api/v0/users/login", 
            {
                method:'POST',
                headers: { 'Content-Type': 'application/json', 'ACCEPT' : 'application/json'},
                body: JSON.stringify(loginData)
            })
            if (!response.ok) {
                setLoginFail(true);
                setPassword('');
                return
            }
            const result = await response.json();
            createContext(result);
            navigate('../weather1-fe/daily-game');
        }
        catch (error) {
            console.log('Error', error);
        }};
  
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <Header />
            <div className="login-content">
                <form className="login-form">
                    <img src={logo} alt="Logo" width="80" height="80" style={{ "paddingBottom" : "5px"}}></img>
                    <label htmlFor="username">Username:</label>
                    <input className="username" type="text" value={userName} id="username"
                    onChange={(e) => setUsername(e.target.value)}></input>
                    <label htmlFor="passwordInput" >Password:</label>
                    <input className="password" type={!showPassword ? "password" : "text"} id="passwordInput" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                    <label style={{ "color" : "red", "fontSize" : "10px"}}>
                    {loginFail ? "Invalid Username or Password" : ''}</label>
                    <div style={ {"fontSize" : "10px", "paddingBottom" : "8px", "display" : "flex", "alignItems" : "center"}}>
                    <input type="checkbox" onClick={handleTogglePassword}/>Show Password
                    </div>
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>

        </div>    
    );
};

export default Login;
