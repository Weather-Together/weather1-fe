import React from "react";
import './Profile.css';
import Header2 from '../Header2/Header2';
import Footer from '../Footer/Footer'

const Profile: React.FC = () => {
    return (
        <div className="profile-container">
            <Header2 />
            <div className="profile-content">Profile</div>
            <Footer/>
        </div>
    );
};

export default Profile;