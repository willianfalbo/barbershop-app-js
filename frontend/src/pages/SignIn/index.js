import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

export default function SignIn() {
  return (
    <>
      <img className="logo" src={logo} alt="Barbershop" />

      <form>
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
        <Link to="/register">Create an account</Link>
      </form>
    </>
  );
}
