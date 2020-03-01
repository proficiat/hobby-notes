import React from 'react'
import PropTypes from 'prop-types'

import { PuzzleContainer, Piece, RelativePiece, BridgePiece } from './styles'

const PuzzlePiece = ({ side, color, innerColor }) => (
  <PuzzleContainer side={side}>
    <Piece color={color} left />
    <RelativePiece>
      <BridgePiece innerColor={innerColor} top />
      <BridgePiece color={color} middle />
      <BridgePiece bottom innerColor={innerColor} />
    </RelativePiece>
    <Piece color={color} right />
  </PuzzleContainer>
)

PuzzlePiece.propTypes = {
  color: PropTypes.string.isRequired,
  innerColor: PropTypes.string.isRequired,
  side: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
}

export default PuzzlePiece
