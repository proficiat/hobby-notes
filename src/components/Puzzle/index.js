import React from 'react'
import PropTypes from 'prop-types'

import PuzzlePiece from './PuzzlePiece'

import { Container } from './styles'

// To do: Add settings for pieces variations
const Puzzle = ({ bgColor, color }) => (
  <Container color={color}>
    <PuzzlePiece color={bgColor} innerColor={color} side="left" />
    <PuzzlePiece color={bgColor} innerColor={color} side="top" />
    <PuzzlePiece color={color} innerColor={bgColor} side="bottom" />
  </Container>
)

Puzzle.propTypes = {
  bgColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default Puzzle
