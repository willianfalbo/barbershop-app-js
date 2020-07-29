import React from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="Barbershop" />
      <form>
        <h1>Sign Up</h1>
        <Input name="name" icon={FiUser} placeholder="Name" />
        <Input name="email" icon={FiMail} placeholder="Email" />
        <Input
          name="Password"
          icon={FiLock}
          placeholder="Password"
          type="password"
        />
        <Button type="submit">Register</Button>
      </form>
      <a href="#sign-in">
        <FiArrowLeft />
        Go back to sign in.
      </a>
    </Content>
  </Container>
);

export default SignUp;
