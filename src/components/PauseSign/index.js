import styled from 'styled-components'
import PropTypes from 'prop-types'

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

PauseSign.propTypes = {
  strokeWidth: PropTypes.number,
}

export default PauseSign
