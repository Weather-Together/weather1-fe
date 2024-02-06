import React, { useState }from "react";
import logo from '../Images/logo_480.png'
import Header from '../Header/Header';
import './NewUser.css';


const NewUser: React.FC = () => {
    const [email, setEmail] = useState<string | null>('');
    const [userName, setUserName] = useState<string | null>('');
    const [password, setPassword] = useState<string | null>('');
    const [confirmPassword, setConfirmPassword] = useState<string | null>('');
    const [matchPassword, setMatchPassword] = useState<boolean>(true);
    const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
    const [isValidUserName, setIsValidUserName] = useState<boolean>(false);
    const [error, setError] = useState<any | null>(null);

    const evaluatePassword = (pass1, pass2) => {
        setMatchPassword(false);
        if(pass1){
        if(pass1 !== pass2){
            return setMatchPassword(false);
        }    
        return setMatchPassword(true);
        }
    }

    const checkEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const evaluateUsername = (userName) => {
        if(userName.length > 5) {
            return setIsValidUserName(true);
        }
        setIsValidEmail(false);
    }

    const evaluateEmail = (email) => {
        if(checkEmail(email)){
            return setIsValidEmail(true);
        }
        return setIsValidEmail(false);
    }

    const handleCreate = async (e)  => {
        e.preventDefault()
        evaluatePassword(password, confirmPassword);
        evaluateUsername(userName);
        evaluateEmail(email);
        const newUserData = {
            email: email,
            username: userName,
            password: password,
            password_confirmation: confirmPassword
        }
        if(isValidEmail && matchPassword &&isValidUserName){
            try {
        const response = await fetch("https://weather-together-be.onrender.com/api/v0/users/", {
            method:'POST',
            headers: { 'Content-Type': 'application/json', 'ACCEPT' : 'application/json'},
            body: JSON.stringify(newUserData)
        });
        if (!response.ok) {
            const error = await response.json()
            console.log(error);
            return setError(error.errors[0].detail);
        }
        const result = await response.json();
        console.log("result", result)
        } catch (error) {
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