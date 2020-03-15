import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Background({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}

Background.propTypes = {
  children: PropTypes.element.isRequired,
};
