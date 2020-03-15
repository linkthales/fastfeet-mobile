import React, { useMemo } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container, Description, DataField } from './styles';

export default function Problem({ data }) {
  const createdAt = useMemo(
    () =>
      format(new Date(data.created_at), 'dd/MM/yyyy', {
        locale: pt,
      }),
    [data],
  );

  return (
    <Container>
      <Description>{data.description}</Description>
      <DataField>{createdAt}</DataField>
    </Container>
  );
}

Problem.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
};
