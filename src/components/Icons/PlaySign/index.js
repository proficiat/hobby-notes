import styled from 'styled-components'
import PropTypes from 'prop-types'

import { space, layout, color } from 'styled-system'

import { colors } from '../../../styles'

const PlaySign = styled.div`
  border-top: ${({ strokeWidth }) => strokeWidth}px solid;
  border-right: ${({ strokeWidth }) => strokeWidth}px solid;
  border-color: ${colors.background};
  transform: ${({ leftRotate }) =>
    leftRotate ? 'rotate(225deg)' : 'rotate(45deg)'};
  cursor: pointer;

  ${space};
  ${layout};
  ${color};
`

PlaySign.defaultProps = {
  leftRotate: false,
  strokeWidth: 3,
}

PlaySign.propTypes = {
  leftRotate: PropTypes.bool,
  strokeWidth: PropTypes.number,
}

export default PlaySign
