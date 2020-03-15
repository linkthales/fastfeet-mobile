import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

import { primaryColor } from '~/styles/colors';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
`;

export const Form = styled.View`
  margin: 0 20px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  height: 300px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: ${primaryColor};
`;
