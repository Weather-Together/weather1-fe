import React, { useState }from "react";
import logo from '../Images/logo_480.png'
import Header from '../Header/Header';
import { useNavigate } from "react-router-dom";
import './NewUser.css';


const NewUser: React.FC = () => {
    const [email, setEmail] = useState<string | null>('');
    const [userName, setUserName] = useState<string | null>('');
    const [password, setPassword] = useState<string | null>('');
    const [confirmPassword, setConfirmPassword] = useState<string | null>('');
    const [matchPassword, setMatchPassword] = useState<boolean>(true);
    const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
    const [isValidUserName, setIsValidUserName] = useState<boolean>(true);
    const [error, setError] = useState<any | null>(null);
    const navigate = useNavigate();

    const evaluatePassword = (pass1, pass2) => {
        // setMatchPassword(false);
        if(pass1){
        if(pass1 !== pass2){
            setMatchPassword(false)
            return false;
        }    
        setMatchPassword(true)
        return true;
        }
    }

    const checkEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const evaluateUsername = (userName) => {
        if(userName.length > 5) {
            setIsValidUserName(true)
            return true;
        }
        setIsValidUserName(false);
        return false
    }

    const evaluateEmail = (email) => {
        if(checkEmail(email)){
            setIsValidEmail(true)
            return true;
        }
        setIsValidEmail(false)
        return false;
    }

    const handleCreate = async (e)  => {
        e.preventDefault()
        const newUserData = {
            email: email,
            username: userName,
            password: password,
            password_confirmation: confirmPassword
        }
        if(evaluateEmail(email) && evaluatePassword(password, confirmPassword) && evaluateUsername(userName)){
            try {
                const response = await fetch("https://weather-together-be.onrender.com/api/v0/users/", 
                {
                method:'POST',
                headers: { 'Content-Type': 'application/json', 'ACCEPT' : 'application/json'},
                body: JSON.stringify(newUserData)
                })
                if (!response.ok) {
                    const error = await response.json()
                    console.log(error);
                    return setError(error.errors[0].detail);
                }
                const result = await response.json();
                navigate('../login');
                console.log("Result: ", result);

            } 
            catch (error) {
                console.log("Error", error);
            }
    }}

    return (
        <div className="newuser-container">
            <Header />
            <div className="newuser-content">
                <form className="newuser-form">
                    <img src={logo} alt="Logo" width="80" height="80" style={{ "paddingBottom" : "5px"}}></img>
                    <label htmlFor="email">E-mail: </label>
                    <input type="text" value={email} id="email"
                    onChange={(e) => setEmail(e.target.value)}></input>
                    <label style={{ "color" : "red", "fontSize" : "10px"}}>
                        {isValidEmail ? '':'Invalid Email'}
                    </label>
                    <label htmlFor="username">Username: </label>
                    <input type="text" value={userName} id="username"
                    onChange={(e) => setUserName(e.target.value)}></input>
                    <label style={{ "color" : "red", "fontSize" : "10px"}}>
                        {isValidUserName ? '':'Username must be 5 or more characters'}
                    </label>
                    <label htmlFor="password">Password: </label>
                    <input type="password" value={password} id="password"
                    onChange={(e) => setPassword(e.target.value)}></input>
                    <label htmlFor="confirm-password">Confirm Password: </label>
                    <input type="password" value={confirmPassword} id="confirm-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    <label style={{ "color" : "red", "fontSize" : "10px"}}>
                    {!matchPassword ? "Passwords don't match" : ''}</label>
                    <p>{error ? `${error}` : ''}</p>
                    <button onClick={handleCreate}>Create Account</button>
                </form>
            </div>
            
        </div>    
    );
};

export default NewUser;