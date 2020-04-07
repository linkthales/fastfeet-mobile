import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  primaryColor,
  whiteColor,
  borderColor,
  placeholderColor,
  lightGrayColor,
  backgroundColor,
} from '~/styles/colors';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  background: ${whiteColor};
  margin: 0 20px 10px;
  border: 1px solid ${borderColor};
  border-radius: 5px;
  padding: 15px;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-size: 19px;
  font-weight: bold;
  color: ${primaryColor};
  margin-left: 5px;
`;

export const Title = styled.Text`
  font-size: 19px;
  font-weight: bold;
  color: ${placeholderColor};
  margin-top: 10px;
`;

export const Info = styled.Text`
  font-size: 19px;
  color: ${lightGrayColor};
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: center;

  background: ${backgroundColor};
  border: 1px solid ${borderColor};
  border-radius: 5px;
  margin: 0 20px 20px;
`;

export const Block = styled.View`
  justify-content: center;
  align-items: center;
  width: 33%;
  height: 83px;
`;

export const CustomOpacity = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

export const Divider = styled.View`
  border: 0.5px solid ${borderColor};
`;

export const Text = styled.Text`
  font-size: 16px;
  text-align: center;
`;

export const RetrieveButton = styled(Button)`
  background: ${primaryColor};
  margin: 0 20px 20px;
`;
