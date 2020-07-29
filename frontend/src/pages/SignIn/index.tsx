import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Barbershop" />
      <form>
        <h1>SignIn</h1>
        <Input name="Email" icon={FiMail} placeholder="Email" />
        <Input
          name="Password"
          icon={FiLock}
          placeholder="Password"
          type="password"
        />
        <Button type="submit">SignIn</Button>
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
