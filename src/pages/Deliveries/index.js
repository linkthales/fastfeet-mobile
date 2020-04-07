import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar, RefreshControl } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Background from '~/components/Background';

import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';
import { whiteColor, dangerColor, primaryColor } from '~/styles/colors';

import {
  Container,
  Header,
  Profile,
  Avatar,
  ProfileText,
  Welcome,
  Title,
  ContentHeader,
  Content,
  Text,
  Selector,
  TextButton,
  List,
  Loading,
} from './styles';
import Delivery from '~/components/Delivery';

export default function Deliveries({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.profile);
  const [delivered, setDelivered] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  async function loadDeliveries() {
    try {
      if (loading) return;

      setLoading(true);

      const response = await api.get(
        `deliverymans/${profile.id}/deliveries?page=${currentPage}${
          delivered ? '&delivered=true' : ''
        }`,
      );

      const { pages: maxPages, deliveries: newDeliveries } = response.data;

      setDeliveries(
        currentPage > 1 ? [...deliveries, ...newDeliveries] : newDeliveries,
      );
      setPages(maxPages);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadDeliveries();
    }
  }, [delivered, currentPage, isFocused]);

  function handleLogout() {
    dispatch(signOut());
  }

  async function handleOnRefresh() {
    if (currentPage !== 1) {
      return setCurrentPage(1);
    }

    return loadDeliveries();
  }

  function handleOnEndReached() {
    if (pages > currentPage && !loading) {
      setCurrentPage(currentPage + 1);
    }
  }

  useFocusEffect(
    useCallback(() => {
      setCurrentPage(1);
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(whiteColor);
    }, []),
  );

  return (
    <Background>
      <Container>
        <Header>
          <Profile>
            <Avatar
              source={{
                uri: profile.avatar
                  ? profile.avatar.url
                  : `https://api.adorable.io/avatar/50/${profile.name}.png`,
              }}
            />
            <ProfileText>
              <Welcome>Bem vindo de volta,</Welcome>
              <Title>{profile.name}</Title>
            </ProfileText>
          </Profile>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="exit-to-app" size={25} color={dangerColor} />
          </TouchableOpacity>
        </Header>
        <ContentHeader>
          <Title>Entregas</Title>
          <Selector>
            <TouchableOpacity
              onPress={async () => {
                if (delivered) {
                  setCurrentPage(1);
                }
                setDelivered(false);
              }}
            >
              <TextButton active={!delivered}>Pendentes</TextButton>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                if (!delivered) {
                  setCurrentPage(1);
                }
                setDelivered(true);
              }}
            >
              <TextButton active={delivered}>Entregues</TextButton>
            </TouchableOpacity>
          </Selector>
        </ContentHeader>
        {!deliveries[0] && !loading && (
          <Content>
            <Text>
              Nenhuma encomenda {delivered ? 'entregue' : 'pendente'}.
            </Text>
          </Content>
        )}
        <List
          data={deliveries}
          refreshControl={
            <RefreshControl
              colors={[primaryColor]}
              refreshing={loading}
              onRefresh={handleOnRefresh}
            />
          }
          ListFooterComponent={() =>
            currentPage !== 1 &&
            loading && <Loading size="small" color={primaryColor} />
          }
          onEndReachedThreshold={0.4}
          onEndReached={handleOnEndReached}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Delivery navigation={navigation} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Deliveries.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
