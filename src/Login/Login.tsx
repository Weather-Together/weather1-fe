import React from "react";
import './Login.css';



const Login: React.FC = () => {
//function to handle submit
    const handleLogin = () => {

        //Cases to cover:
            //Successful Post and returned profile - route to Daily round
            //Successful Post and returned failure - Clear password and indicate incorrect form
            //Invalid Submission - indicate invalid forms clear password
            //Failed Post - indicate unable to connect to login server
            return 
        };
  
    const showPassword = () => {
        return
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <form className="login-form">
                    <label>Username:</label>
                    <input className="username" type="string"></input>
                    <label>Password:</label>
                    <input className="password" type="password" id="passwordInput"></input>
                    <input type="checkbox" onClick={showPassword}/>Show Password
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>    
    );
};

export default Login;
