/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled, { css } from 'styled-components';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import propToStyle from '../../../theme/utils/propToStyle';
import breakpointsMedia from '../../../theme/utils/breackpointsMedia';

const textStyle = ({ theme, variant }) => css`
  font-size: ${theme.typographyVariants[variant].fontSize};
  font-weight: ${theme.typographyVariants[variant].fontWeight};
  line-height: ${theme.typographyVariants[variant].lineHeight};
`;

export const TextStyleVariantsMap = {
  smallestException: ({ theme }) => textStyle({ theme, variant: 'smallestException' }),
  paragraph1: ({ theme }) => textStyle({ theme, variant: 'paragraph1' }),
  title: css`
    ${({ theme }) => textStyle({ theme, variant: 'titleXS' })}
    ${breakpointsMedia({
    md: ({ theme }) => textStyle({ theme, variant: 'title' }),
  })}
  `,
};

const TextBase = styled.span`
  ${(props) => TextStyleVariantsMap[props.variant]}
  color: ${({ theme, color }) => get(theme, `colors.${color}.color`)};
  ${propToStyle('textAlign')}
  ${propToStyle('marginBottom')}
  ${propToStyle('margin')}
  ${propToStyle('display')}
`;

const Text = ({
  variant,
  children,
  tag,
  ...props
}) => (
  <TextBase
    as={tag}
    variant={variant}
    {...props}
  >
    {children}
  </TextBase>
);

Text.defaultProps = {
  tag: 'span',
  variant: 'paragraph1',
};

Text.propTypes = {
  tag: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Text;
