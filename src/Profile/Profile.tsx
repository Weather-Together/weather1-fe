import React from "react";
import './Profile.css';
import Header2 from '../Header2/Header2';

const Profile: React.FC = () => {
    return (
        <div className="profile-container">
            <Header2 />
            <div className="profile-content">Profile</div>
        </div>    
    );
};

export default Profile;