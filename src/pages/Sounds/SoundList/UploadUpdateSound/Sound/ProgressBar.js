import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const Status = styled.span`
  position: absolute;
  top: 18px;
`

export const Progress = styled.div`
  width: 100%;
  background: ${props => props.theme.background};
  border-radius: 4px;
`

export const Bar = styled.div`
  width: ${props => props.width || 0}%;
  background: ${props => props.theme.active};
  height: 2px;
  transition: 0.4s linear;
  transition-property: width;
  border-radius: 4px;
`

const ProgressBar = ({ percent }) => {
  return (
    <Container>
      <Progress>
        <Bar width={percent} />
      </Progress>
      <Status>{percent}% Loading...</Status>
    </Container>
  )
}

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
}

export default ProgressBar
