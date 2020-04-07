import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Problem from '~/components/Problem';
import api from '~/services/api';

import { Container, Title, Content, Text, List, Loading } from './styles';
import { primaryColor } from '~/styles/colors';

export default function ListProblems({ route }) {
  const { deliveryId } = route.params;
  const [problems, setProblems] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function getDeliveryProblems() {
    try {
      if (loading) return;

      setLoading(true);

      const response = await api.get(
        `delivery/${deliveryId}/problems?page=${currentPage}`,
      );

      const { pages: maxPages, problems: newProblems } = response.data;

      setProblems(
        currentPage > 1 ? [...problems, ...newProblems] : newProblems,
      );
      setPages(maxPages);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDeliveryProblems();
  }, [deliveryId, currentPage]);

  function handleOnRefresh() {
    if (currentPage !== 1) {
      return setCurrentPage(1);
    }

    return getDeliveryProblems();
  }

  function handleOnEndReached() {
    if (pages >= currentPage && !loading) {
      setCurrentPage(currentPage + 1);
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
        <Title>Encomenda {deliveryId}</Title>

        {!problems[0] && !loading && (
          <Content>
            <Text>Não há problemas na entrega desta encomenda</Text>
          </Content>
        )}
        <List
          data={problems}
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
          renderItem={({ item }) => <Problem data={item} />}
        />
      </Container>
    </Background>
  );
}

ListProblems.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      deliveryId: PropTypes.number,
    }),
  }).isRequired,
};
