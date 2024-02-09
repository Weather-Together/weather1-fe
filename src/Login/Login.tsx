import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from '../Images/logo_480.png';
import './Login.css';
import Header from '../Header/Header';


const Login: React.FC = () => {
    const [userName, setUsername] = useState<string | null> ('');
    const [password, setPassword] = useState<string | null>('');
    const [loginFail, setLoginFail] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const { userLogin } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('User')){
            return navigate('../daily-game')
        }
    },[navigate])

//function to handle submit
    const handleLogin = async (event) => {
        event.preventDefault();
        const loginData = {
            email: userName,
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
                const error = await response.json();
                setLoginFail(true);
                setPassword('');
                return setError(error.errors[0].detail);
            }
            const result = await response.json();
            localStorage.setItem('User', JSON.stringify(result.data));
            navigate('../daily-game');
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
                    <img className='weather-logo'src={logo} alt="Logo" width="80" height="80" style={{ "paddingBottom" : "5px"}}></img>
                    <label htmlFor="username">Username:</label>
                    <input className="username" type="text" value={userLogin ? userLogin : userName} id="username"
                    onChange={(e) => setUsername(e.target.value)}></input>
                    <label htmlFor="passwordInput" >Password:</label>
                    <input className="password" type={!showPassword ? "password" : "text"} id="passwordInput" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                    <label className='login-fail' style={{ "color" : "red", "fontSize" : "10px"}}>
                    {loginFail ? `${error}` : ''}</label>
                    <div style={ {"fontSize" : "10px", "paddingBottom" : "8px", "display" : "flex", "alignItems" : "center"}}>
                    <input className='show-pass' type="checkbox" onClick={handleTogglePassword}/>Show Password
                    </div>
                    <button className='login-button'onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>    
    );
};

export default Login;
