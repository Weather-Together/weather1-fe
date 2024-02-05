
import React, { useState }from "react";
import logo from '../Images/logo_480.png'
import './NewUser.css';


const NewUser: React.FC = () => {
    const [email, setEmail] = useState<string | null>('');
    const [userName, setUserName] = useState<string | null>('');
    const [password, setPassword] = useState<string | null>('');
    const [confirmPassword, setConfirmPassword] = useState<string | null>('');
    const [matchPassword, setMatchPassword] = useState<boolean>(true);

    const handleCreate = (e) => {
        e.preventDefault();
        if(confirmPassword !== password){
            if(matchPassword){
            setMatchPassword(!matchPassword)
            };
            return
        }
        const postInfo = {
            email: email,
            username: userName,
            password: password,
            password_confirmation: confirmPassword
        }
    }

    return (
        <div className="newuser-container">
            <div className="newuser-content">
                <form className="newuser-form">
                    <img src={logo} alt="Logo" width="80" height="80" style={{ "paddingBottom" : "5px"}}></img>
                    <label>E-mail: </label>
                    <input type="text" value={email} 
                    onChange={(e) => setEmail(e.target.value)}></input>
                    <label>Username: </label>
                    <input type="text" value={userName} 
                    onChange={(e) => setUserName(e.target.value)}></input>
                    <label>Password: </label>
                    <input type="password" value={password} 
                    onChange={(e) => setPassword(e.target.value)}></input>
                    <label>Confirm Password: </label>
                    <input type="password" value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    <label style={{ "color" : "red", "fontSize" : "10px"}}>
                    {!matchPassword ? "Passwords don't match" : ''}</label>
                    <button onClick={handleCreate}>Create Account</button>
                </form>
            </div>
        </div>    
    );
};

export default NewUser;