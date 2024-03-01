import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../Images/logo_480.png';
import './Login.css';
import Header from '../Header/Header';
import { Player } from '@lottiefiles/react-lottie-player'; // Import the Lottie Player


const Login: React.FC = () => {
    const [email, setEmail] = useState<string | null> ('');
    const [password, setPassword] = useState<string | null>('');
    const [loginFail, setLoginFail] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('User')){
            return navigate('../daily-game')
        }
    },[navigate])

//function to handle submit
    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Set isLoading
        const loginData = {
            email: email,
            password: password
        };
        try{
           const response = await fetch("https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/login", 
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

            setIsLoading(false)
        } catch (error) {
            console.log('Error', error);
        }};
        
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <Header />

                <Player
                src='https://lottie.host/f35fa82a-0091-4ee8-ad6d-77e329ed464a/KqOVOsmCeH.json'
                className="player"
                loop={true}
                 autoplay={true}
                />

            <div className="login-content">
                <form className="login-form">
                    <img className='weather-logo'src={logo} alt="Logo" width="80" height="80" style={{ "paddingBottom" : "5px"}}></img>
                    <label htmlFor="email">Email Address:</label>
                    <input className="email" type="text" value={email} id="email"
                    onChange={(e) => setEmail(e.target.value)}></input>
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
                    {isLoading ? 'Logging in...' : ''}
                </form>
            </div>

                 <Player
                src='https://lottie.host/22de9b27-ab62-4b4f-b76f-0d0bfa2af678/wV6oqOj6AX.json'
                className="player"
                loop={true}
                 autoplay={true}
                />
        </div>    
    );
};

export default Login;
