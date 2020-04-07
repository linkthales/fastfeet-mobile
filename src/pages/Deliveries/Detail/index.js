import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StatusBar, View, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { ScrollView } from 'react-native-gesture-handler';
import Background from '~/components/Background';
import Header from '~/components/Header';
import api from '~/services/api';

import { primaryColor, dangerColor, warningColor } from '~/styles/colors';

import {
  Container,
  Content,
  ContentHeader,
  HeaderText,
  Title,
  Info,
  Row,
  Actions,
  Block,
  CustomOpacity,
  Text,
  Divider,
  RetrieveButton,
} from './styles';

export default function Detail({ navigation, route }) {
  const { delivery } = route.params;
  const profile = useSelector(state => state.auth.profile);

  const startDate = useMemo(
    () =>
      delivery.start_date
        ? format(new Date(delivery.start_date), 'dd/MM/yyyy', {
            locale: pt,
          })
        : '- - / - - / - - - -',
    [delivery],
  );

  const endDate = useMemo(
    () =>
      delivery.end_date
        ? format(new Date(delivery.end_date), 'dd/MM/yyyy', {
            locale: pt,
          })
        : '- - / - - / - - - -',
    [delivery],
  );

  async function handleRetrieve() {
    try {
      await api.put(`deliverymans/${profile.id}/retrieve/${delivery.id}`);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Falha ao retirar encomenda', err.response.data.error);
    }
  }

  function handleNavigation(page) {
    navigation.navigate(page, { deliveryId: delivery.id });
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
        <ScrollView>
          <Header />
          <Content>
            <ContentHeader>
              <Icon name="local-shipping" size={25} color={primaryColor} />
              <HeaderText>Informações da entrega</HeaderText>
            </ContentHeader>

            <Title>DESTINATÁRIO</Title>
            <Info>{delivery.recipient.name}</Info>

            <Title>ENDEREÇO DE ENTREGA</Title>
            <Info>{delivery.recipient.full_address}</Info>

            <Title>PRODUTO</Title>
            <Info>{delivery.product}</Info>
          </Content>

          <Content>
            <ContentHeader>
              <Icon name="event" size={25} color={primaryColor} />
              <HeaderText>Situação da entrega</HeaderText>
            </ContentHeader>

            <Title>STATUS</Title>
            <Info>
              {delivery.end_date
                ? 'Entregue'
                : delivery.start_date
                ? 'Pendente'
                : 'Aguardando retirada'}
            </Info>

            <Row>
              <View>
                <Title>DATA DE RETIRADA</Title>
                <Info>{startDate}</Info>
              </View>

              <View>
                <Title>DATA DE ENTREGA</Title>
                <Info>{endDate}</Info>
              </View>
            </Row>
          </Content>

          {delivery.start_date && !delivery.end_date ? (
            <Actions>
              <>
                <Block>
                  <CustomOpacity
                    onPress={() => {
                      handleNavigation('ReportProblem');
                    }}
                  >
                    <Icon name="highlight-off" size={20} color={dangerColor} />
                    <Text>Informar{'\n'}Problema</Text>
                  </CustomOpacity>
                </Block>
                <Divider />
                <Block>
                  <CustomOpacity
                    onPress={() => {
                      handleNavigation('ListProblems');
                    }}
                  >
                    <Icon name="info-outline" size={20} color={warningColor} />
                    <Text>Visualizar{'\n'}Problemas</Text>
                  </CustomOpacity>
                </Block>
                <Divider />
                <Block>
                  <CustomOpacity
                    onPress={() => {
                      handleNavigation('ConfirmDelivery');
                    }}
                  >
                    <Icon name="alarm-on" size={20} color={primaryColor} />
                    <Text>Confirmar{'\n'}Entrega</Text>
                  </CustomOpacity>
                </Block>
              </>
            </Actions>
          ) : !delivery.end_date ? (
            <>
              <RetrieveButton onPress={handleRetrieve}>
                Retirar encomenda
              </RetrieveButton>
            </>
          ) : (
            <>
              <RetrieveButton
                onPress={() => {
                  handleNavigation('ListProblems');
                }}
              >
                Visualizar Problemas
              </RetrieveButton>
            </>
          )}
        </ScrollView>
      </Container>
    </Background>
  );
}

Detail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery: PropTypes.shape({
        id: PropTypes.number,
        product: PropTypes.string,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        recipient: PropTypes.shape({
          name: PropTypes.string,
          full_address: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};
