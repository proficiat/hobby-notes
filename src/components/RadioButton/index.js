import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const HEIGHT = 16
const WIDTH = 16

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: ${HEIGHT}px;
  width: ${WIDTH}px;
  background: ${({ theme }) => theme.background};
  border-radius: 50%;
  border: 1px solid ${props => props.theme.luciaLash};

  :after {
    content: '';
    position: absolute;
    display: none;
    top: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: white;
  }
`

const Container = styled.label`
  position: relative;
  cursor: pointer;
  height: ${HEIGHT}px;
  padding-left: ${WIDTH + 8}px;
  text-align: center;

  > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  :hover input ~ ${Checkmark} {
    background-color: ${({ theme }) => theme.suicidePreventionBlue};
  }

  input:checked ~ ${Checkmark} {
    background-color: ${({ theme }) => theme.westSide};
  }

  input:checked ~ ${Checkmark}:after {
    display: block;
  }

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const RadioButtin = ({ checked, label, value, onChange }) => {
  return (
    <Container>
      {label}
      <input checked={checked} type="radio" value={value} onChange={onChange} />
      <Checkmark />
    </Container>
  )
}

RadioButtin.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default RadioButtin
