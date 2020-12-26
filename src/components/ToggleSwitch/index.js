import React from 'react'

import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'

const TOGGLE_SIZE = 22
const INDENT = 3

const Toggle = styled.span`
  position: absolute;
  height: ${TOGGLE_SIZE}px;
  width: ${TOGGLE_SIZE}px;
  left: ${INDENT}px;
  bottom: ${INDENT}px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
`

const ToggleArea = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.blush};
  -webkit-transition: 0.4s;
  transition: 0.4s;

  ${props =>
    props.round &&
    css`
      border-radius: 20px;
      ${Toggle} {
        border-radius: 50%;
      }
    `}
`

const HiddenCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleArea} {
    background-color: ${props => props.theme.suicidePreventionBlue};
  }
  &:focus + ${ToggleArea} {
    box-shadow: 0 0 1px ${props => props.theme.suicidePreventionBlue};
  }

  &:checked + ${ToggleArea} > ${Toggle} {
    -webkit-transform: translateX(${TOGGLE_SIZE}px);
    -ms-transform: translateX(${TOGGLE_SIZE}px);
    transform: translateX(${TOGGLE_SIZE}px);
  }
`

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: ${TOGGLE_SIZE * 2 + INDENT * 2}px;
  height: ${TOGGLE_SIZE + INDENT * 2}px;
`

const ToggleSwitch = ({ isChecked, onToggle }) => {
  return (
    <Switch>
      <HiddenCheckbox checked={isChecked} onChange={onToggle} />
      <ToggleArea round>
        <Toggle />
      </ToggleArea>
    </Switch>
  )
}

ToggleSwitch.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default ToggleSwitch
