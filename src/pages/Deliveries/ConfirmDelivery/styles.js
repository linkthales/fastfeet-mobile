import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';

import Button from '~/components/Button';
import { primaryColor } from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Camera = styled(RNCamera)`
  width: 335px;
  height: 444px;
  border-radius: 5px;
  justify-content: flex-end;
  align-items: center;
`;

export const Image = styled.Image`
  width: 335px;
  height: 444px;
  border-radius: 5px;
`;

export const StyledButton = styled(Button)`
  background: ${primaryColor};
  width: 335px;
  margin: 20px 0;
`;
