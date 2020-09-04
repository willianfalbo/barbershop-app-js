import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

export default function SignUp() {
  return (
    <>
      <img className="logo" src={logo} alt="Barbershop" />

      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Password" />
        <button type="submit">Create Account Now</button>
        <Link to="/">Already have an account?</Link>
      </form>
    </>
  );
}
