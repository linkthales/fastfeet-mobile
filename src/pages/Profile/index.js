import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import { whiteColor } from '~/styles/colors';

import { Container, Avatar, Label, Span, LogoutButton } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.profile);

  const createdAt = useMemo(
    () =>
      format(new Date(profile.created_at), 'dd/MM/yyyy', {
        locale: pt,
      }),
    [profile],
  );

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background barStyle="dark-content" backgroundColor={whiteColor}>
      <Container>
        <Avatar
          source={{
            uri: profile.avatar
              ? profile.avatar.url
              : `https://api.adorable.io/avatar/50/${profile.name}.png`,
          }}
        />

        <Label>Nome completo</Label>
        <Span>{profile.name}</Span>

        <Label>Email</Label>
        <Span>{profile.email}</Span>

        <Label>Data de cadastro</Label>
        <Span>{createdAt}</Span>

        <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
      </Container>
    </Background>
  );
}
