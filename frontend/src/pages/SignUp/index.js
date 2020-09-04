import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please use a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Password field is required'),
});

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img className="logo" src={logo} alt="Barbershop" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Name" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Password" />
        <button type="submit">Create Account</button>
        <Link to="/">Already have an account?</Link>
      </Form>
    </>
  );
}
