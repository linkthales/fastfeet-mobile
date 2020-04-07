import React, { useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Alert, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import Header from '~/components/Header';
import api from '~/services/api';

import confirmImage from '~/assets/confirm-delivery.png';

import { Container, Content, Camera, Image, StyledButton } from './styles';
import { primaryColor } from '~/styles/colors';

export default function ConfirmDelivery({ navigation, route }) {
  const { deliveryId } = route.params;
  const profile = useSelector(state => state.auth.profile);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState('');
  const cameraRef = useRef(null);

  async function takePicture() {
    if (cameraRef && cameraOpen) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhoto(data.uri);
    }

    return setCameraOpen(!cameraOpen);
  }

  async function handleSubmit() {
    try {
      const data = new FormData();

      data.append('file', {
        uri: photo,
        name: `signature-${deliveryId}.jpg`,
        type: 'image/jpg',
      });

      const response = await api.post('/files?type=signature', data);

      const { id } = response.data;

      await api.put(`deliverymans/${profile.id}/deliver/${deliveryId}`, {
        signature_id: id,
      });

      Alert.alert(
        'Encomenda entregue',
        `Encomenda ${deliveryId} entregue com sucesso.`,
      );
      navigation.popToTop();
    } catch (err) {
      Alert.alert('Falha ao entregar encomenda', err.response.data.error);
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
        <Content>
          {cameraOpen ? (
            <Camera
              ref={cameraRef}
              type="back"
              flashMode="off"
              captureAudio={false}
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                setCameraOpen(true);
              }}
            >
              <Image source={photo ? { uri: photo } : confirmImage} />
            </TouchableOpacity>
          )}
          {photo && !cameraOpen ? (
            <StyledButton onPress={handleSubmit}>Enviar</StyledButton>
          ) : (
            <StyledButton onPress={takePicture}>Tirar Foto</StyledButton>
          )}
        </Content>
      </Container>
    </Background>
  );
}

ConfirmDelivery.propTypes = {
  navigation: PropTypes.shape({
    popToTop: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      deliveryId: PropTypes.number,
    }),
  }).isRequired,
};
