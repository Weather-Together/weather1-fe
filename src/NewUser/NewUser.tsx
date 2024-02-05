import Header from '../Header/Header';
import React from "react";
import './NewUser.css';

const NewUser: React.FC = () => {
    return (
        <div className="newuser-container">
            <Header />
            <div className="newuser-content">User Info</div>
        </div>    
    );
};

export default NewUser;