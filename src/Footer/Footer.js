import React from 'react';

import './Footer.css'

function Footer() {
  const user = JSON.parse(localStorage.getItem("User"))
  return (
    <footer className='footer-container'>
    {user && user.attributes ? (
      <h1 className='username'>Welcome {user.attributes.username}!</h1>
    ) : (
      <h1 className='username'>Welcome Guest!</h1>
    )}
  </footer>
  );
}

export default Footer;