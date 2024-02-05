import React from "react";
import './Login.css';
import Header from '../Header/Header';

const Login: React.FC = () => {
    return (
        <div className="login-container">
            <Header />
            <div className="login-content">Login</div>
        </div>    
    );
};

export default Login;
