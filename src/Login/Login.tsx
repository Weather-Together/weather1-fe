import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import user from '../MockData/MockData';
import logo from '../Images/logo_480.png';
import userLogin from '../APICalls/APICalls';
import './Login.css';

interface userTemplate {
    user : {
    userName: string,
    password: string,
    loggedIn: boolean
    }
};

const Login: React.FC = () => {
    const [userName, setUsername] = useState<string | null> ('');
    const [password, setPassword] = useState<string | null>('');
    const [userInfo, setUserInfo] = useState<userTemplate | null>(user)
    const [loginFail, setLoginFail] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    
    const navigate = useNavigate();

//function to handle submit
    const handleLogin = (event) => {
        event.preventDefault()
        const loginData = {
            user: {
            username: userName,
            password: password
        }
        }
        fetch("https://weather-together-be.onrender.com/api/v0/users", {
            method:'POST',
            headers: { 'Content-Type': 'application.json'},
            body: JSON.stringify(loginData)
        })
        .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((responseData) => {
            console.log('Response Data:', responseData)
        })
        // if(userInfo.user.loggedIn){
        //     navigate('../weather1-fe/daily-game');
        // }
        // setPassword('')
        // if(!loginFail){
        // setLoginFail(!loginFail)
        // }
        //Cases to cover:
            //Successful Post and returned profile - route to Daily round
            //Successful Post and returned failure - Clear password and indicate incorrect form
            //Invalid Submission - indicate invalid forms clear password
            //Failed Post - indicate unable to connect to login server
            return 
        };
  
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <form className="login-form">
                    <img src={logo} alt="Logo" width="80" height="80" style={{ "paddingBottom" : "5px"}}></img>
                    <label>Username:</label>
                    <input className="username" type="text" value={userName}
                    onChange={(e) => setUsername(e.target.value)}></input>
                    <label>Password:</label>
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
