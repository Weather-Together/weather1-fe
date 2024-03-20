import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import Header2 from '../Header2/Header2';
import Footer from '../Footer/Footer';

const Profile = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('User');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (!user) {
      navigate('../profile');
    }
  }, [navigate, user]);
  
  const userDetails = {
    email: user ? user.email : "",
    username: user ? user.username : ""
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        console.log('fetched data', data.data.attributes);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user, userDetails]);
  console.log(user)
  return (
    <div className="profile-container">
      <Header2 />
      <div className="profile-content">
        <h3>Profile Details</h3>
        <p>Email: {user.attributes.email}</p>
        <p>Username: {user.attributes.username}</p>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;