import styled from 'styled-components/native';

import Button from '~/components/Button';

import { dangerColor, lightGrayColor, grayColor } from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px 36px;
`;

export const Avatar = styled.Image`
  align-self: center;

  margin: 40px 0;
  width: 140px;
  height: 140px;
  border-radius: 70px;
`;

export const Label = styled.Text`
  font-size: 12px;
  color: ${lightGrayColor};
`;

export const Span = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${grayColor};
  margin-bottom: 15px;
`;

export const LogoutButton = styled(Button)`
  margin: 15px 0;
  background: ${dangerColor};
`;
