import React, { useState, useCallback } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import Header from '~/components/Header';
import api from '~/services/api';

import { Container, Form, FormInput, SubmitButton } from './styles';
import { primaryColor } from '~/styles/colors';

export default function ReportProblem({ navigation, route }) {
  const { deliveryId } = route.params;
  const [problem, setProblem] = useState('');

  async function handleSubmit() {
    try {
      await api.post(`delivery/${deliveryId}/problems`, {
        description: problem,
      });
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Falha ao informar problema na entrega',
        err.response.data.error,
      );
    }
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(primaryColor);
    }, []),
  );

  return (
    <Background>
      <Container>
        <Header />
        <Form>
          <FormInput
            multiline
            textAlignVertical="top"
            numberOfLines={17}
            placeholder="Inclua aqui o problema que ocorreu na entrega."
            value={problem}
            onChangeText={setProblem}
          />
          <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

ReportProblem.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      deliveryId: PropTypes.number,
    }),
  }).isRequired,
};
