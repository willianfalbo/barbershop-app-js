import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Barbershop" />
      <form>
        <h1>SignIn</h1>
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <button type="submit">SignIn</button>
        <a href="#forgot-password">Forgot password?</a>
      </form>
      <a href="#create-account">
        <FiLogIn />
        Create an account
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
