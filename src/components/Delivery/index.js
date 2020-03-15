import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  HeaderText,
  Content,
  ContentBlock,
  Line,
  Dot,
  SmallText,
  Footer,
  TextBold,
  Block,
} from './styles';
import { primaryColor } from '~/styles/colors';

export default function Delivery({ data, navigation }) {
  const createdAt = useMemo(
    () =>
      format(new Date(data.created_at), 'dd/MM/yyyy', {
        locale: pt,
      }),
    [data],
  );

  return (
    <Container>
      <Header>
        <Icon name="local-shipping" size={25} color={primaryColor} />
        <HeaderText>Encomenda {data.id}</HeaderText>
      </Header>
      <Line />
      <Content>
        <ContentBlock>
          <Dot active />
          <SmallText>Aguardando{'\n'}Retirada</SmallText>
        </ContentBlock>
        <ContentBlock>
          <Dot active={data.start_date} />
          <SmallText>Retirada</SmallText>
        </ContentBlock>
        <ContentBlock>
          <Dot active={data.end_date} />
          <SmallText>Entregue</SmallText>
        </ContentBlock>
      </Content>
      <Footer>
        <Block>
          <SmallText>Data</SmallText>
          <TextBold>{createdAt}</TextBold>
        </Block>
        <Block>
          <SmallText>Cidade</SmallText>
          <TextBold>{data.recipient.city}</TextBold>
        </Block>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Detail', { delivery: data });
          }}
        >
          <TextBold active>Ver detalhes</TextBold>
        </TouchableOpacity>
      </Footer>
    </Container>
  );
}

Delivery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    created_at: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }),
  }).isRequired,
};
