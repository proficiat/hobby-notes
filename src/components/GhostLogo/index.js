import React from 'react'

import GhostIcon from './GhostIcon'
import ShadowIcon from './ShadowIcon'

import { Container } from './styles'

const GhostLogo = () => (
  <Container>
    <GhostIcon /> <ShadowIcon />
  </Container>
)

GhostLogo.propTypes = {}

export default GhostLogo
