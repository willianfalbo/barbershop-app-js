import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '../../store/modules/auth/actions';
import { updateProfileRequest } from '../../store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatarId" />
        <Input name="name" placeholder="Full Name" />
        <Input name="email" type="email" placeholder="E-mail Address" />
        <hr />
        <Input name="oldPassword" type="password" placeholder="Old Password" />
        <Input name="password" type="password" placeholder="New Password" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Password Confirmation"
        />
        <button type="submit">Update Profile</button>
      </Form>
      <button type="button" onClick={handleSignOut}>
        Logout
      </button>
    </Container>
  );
}

export default Profile;
