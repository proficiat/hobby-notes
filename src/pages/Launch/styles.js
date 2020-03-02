import styled from 'styled-components'

import { colors } from 'styles'

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  padding: 33px 80px;
  top: 0;
  left: 88px;
  background: ${colors.luciaLash};
  font-weight: 300;
  width: 380px;
  z-index: 4;

  :before,
  :after {
    top: 50%;
    right: 100%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  :after {
    border: solid 16px rgba(136, 183, 213, 0);
    border-right-color: ${colors.luciaLash};
  }
`

export const Title = styled.h3`
  margin-bottom: 18px;
  font-weight: 300;
  color: white;
  font-size: 28px;
  text-transform: uppercase;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 11px;
  margin: 0 auto 8px auto;
  color: white;
`

export const Input = styled.input`
  height: 32px;
  background-color: white;
  outline: none;
  border: 1px solid white;
  color: ${colors.luciaLash};
  font-weight: 300;
  width: 220px;
  margin-top: 4px;
  padding-left: 8px;
`

export const Button = styled.button`
  height: 32px;
  font-size: 12px;
  font-weight: 300;
  margin-top: 26px;
  width: 144px;
  background-color: white;
  border-color: white;
  outline: none;
  cursor: pointer;
  color: ${colors.luciaLash};
  text-transform: uppercase;
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Error = styled.div`
  font-size: 11px;
  color: red;
`
