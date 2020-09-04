import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import logo from '../../assets/logo.svg';

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }


  return (
    <>
      <img className="logo" src={logo} alt="Barbershop" />

      <Form onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Name" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Password" />
        <button type="submit">Create Account</button>
        <Link to="/">Already have an account?</Link>
      </Form>
    </>
  );
}
