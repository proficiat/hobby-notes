import styled from 'styled-components'

import { space, layout, color } from 'styled-system'

import { colors } from '../../styles'

const PauseSign = styled.div`
  border-left: ${({ strokeWidth }) => strokeWidth}px solid;
  border-right: ${({ strokeWidth }) => strokeWidth}px solid;
  border-color: ${colors.background};
  cursor: pointer;

  ${space};
  ${layout};
  ${color};
`

PauseSign.defaultProps = {
  strokeWidth: 3,
}

export default PauseSign
