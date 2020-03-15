import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { whiteColor, borderColor, lightGrayColor } from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  align-self: center;

  font-size: 24px;
  font-weight: bold;
  color: ${whiteColor};
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;

  background: ${whiteColor};
  margin: 20px 20px 0;
  padding: 15px;
  border: 1px solid ${borderColor};
  border-radius: 5px;
`;

export const Text = styled.Text`
  font-size: 21px;
  color: ${lightGrayColor};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 112 },
})`
  margin-top: 15px;
`;

export const Loading = styled(ActivityIndicator)`
  padding: 17px 0;
`;
