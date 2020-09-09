import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo-black.svg';

import Notifications from '../Notifications';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Barbershop" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />

          <Profile>
            <div>
              <strong>Willian Falbo</strong>
              <Link to="/profile">My Profile</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt="Willian Falbo"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
