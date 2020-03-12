import React from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';
import { Container } from './styles';
import { primaryColor } from '~/styles/colors';

export default function Background({
  children,
  barStyle,
  backgroundColor,
  ...rest
}) {
  return (
    <Container {...rest}>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      {children}
    </Container>
  );
}

Background.defaultProps = {
  barStyle: 'light-content',
  backgroundColor: primaryColor,
};

Background.propTypes = {
  children: PropTypes.element.isRequired,
  barStyle: PropTypes.string,
  backgroundColor: PropTypes.string,
};
