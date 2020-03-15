import styled from 'styled-components/native';
import {
  borderColor,
  whiteColor,
  lightGrayColor,
  placeholderColor,
} from '~/styles/colors';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background: ${whiteColor};
  margin: 10px 20px 0;
  padding: 15px;
  border: 1px solid ${borderColor};
  border-radius: 5px;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 16px;
  color: ${lightGrayColor};
  width: 80%;
`;

export const DataField = styled.Text`
  font-size: 12px;
  color: ${placeholderColor};
`;
