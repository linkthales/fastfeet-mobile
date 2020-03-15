import styled from 'styled-components/native';
import {
  primaryColor,
  borderColor,
  blackColor,
  whiteColor,
} from '~/styles/colors';

export const Container = styled.View`
  border: 1px solid ${borderColor};
  border-radius: 5px;
  padding: 14px;
  margin-bottom: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const HeaderText = styled.Text`
  font-size: 19px;
  font-weight: bold;
  color: ${primaryColor};
  margin-left: 10px;
`;

export const Line = styled.View`
  top: 22px;
  border: 0.5px solid ${primaryColor};
  margin: 0 20px;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin: 14px 0;
`;

export const ContentBlock = styled.View`
  align-items: center;
`;

export const Dot = styled.View`
  background: ${props => (props.active ? primaryColor : whiteColor)};
  height: 14px;
  width: 14px;
  border-radius: 7px;
  border: ${primaryColor};
`;

export const SmallText = styled.Text`
  font-size: 10px;
  text-align: center;
  margin-top: 7px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  background: ${borderColor};
  margin: 0 -14px -14px;
  padding: 14px;
`;

export const Block = styled.View`
  align-items: flex-start;
`;

export const TextBold = styled.Text`
  font-size: 16px;
  font-weight: bold;

  color: ${props => (props.active ? primaryColor : blackColor)};
`;
