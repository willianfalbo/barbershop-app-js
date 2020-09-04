import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Please use a valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img className="logo" src={logo} alt="Barbershop" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
        <Link to="/register">Create an account</Link>
      </Form>
    </>
  );
}
