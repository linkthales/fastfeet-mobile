import styled from 'styled-components/native';

import { whiteColor, borderColor, placeholderColor } from '~/styles/colors';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: ${whiteColor};
  border-radius: 4px;
  border: 1px solid ${borderColor};

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: placeholderColor,
})`
  flex: 1;
  font-size: 15px;
  color: #000;
`;
