import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { primaryColor, placeholderColor } from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 25px 20px 0;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Profile = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const ProfileText = styled.View`
  margin-left: 15px;
`;

export const Welcome = styled.Text`
  font-size: 16px;
`;

export const Title = styled.Text`
  font-size: 29px;
  font-weight: bold;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 22px 0;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 22px 0;
`;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const Selector = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  margin-left: 15px;
  font-size: 16px;
  font-weight: bold;

  color: ${props => (props.active ? primaryColor : placeholderColor)};
  text-decoration: ${props => (props.active ? 'underline' : 'none')};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 0 },
})``;

export const Loading = styled(ActivityIndicator)`
  padding-bottom: 17px;
`;
