import styled from 'styled-components'

import { space, layout, color } from 'styled-system'

import { colors } from '../../styles'

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
  strokeWidth: 3,
  leftRotate: false,
}

export default PlaySign
