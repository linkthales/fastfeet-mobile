import React from 'react';
import { Text } from 'react-native';

import Background from '~/components/Background';

import { Container } from './styles';
import { whiteColor } from '~/styles/colors';

export default function Deliveries() {
  return (
    <Background barStyle="dark-content" backgroundColor={whiteColor}>
      <Container>
        <Text>Deliveries</Text>
      </Container>
    </Background>
  );
}
