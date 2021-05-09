import styled from 'styled-components'
import { lighten } from 'polished'

import { space } from 'styled-system'

const Button = styled.button`
  font-weight: 300;
  text-transform: uppercase;
  height: 44px;
  font-size: 16px;
  width: 144px;
  background: ${({ theme, confirm }) => (confirm ? theme.violet : theme.jade)};
  outline: none;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background 0.5s ease-out;

  ${space};

  :hover {
    background-color: ${({ theme, confirm }) =>
      lighten(0.05, confirm ? theme.violet : theme.jade)};
  }
`

export default Button
