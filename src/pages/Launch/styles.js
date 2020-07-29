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
  z-index: 6;
  box-shadow: 1px 0 22px 0 rgba(10, 10, 10, 0.8);

  :before,
  :after {
    top: 92px;
    right: 100%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border: solid 16px transparent;
    border-right-color: ${colors.luciaLash};
    z-index: 6;
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
  font-size: 14px;
  margin: 0 auto 16px auto;
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
  border-radius: 4px;
`

export const Button = styled.button`
  height: 44px;
  font-size: 16px;
  font-family: 'economica, serif';
  font-weight: 300;
  margin-top: 18px;
  width: 144px;
  background-color: ${colors.red};
  outline: none;
  cursor: pointer;
  color: ${colors.blush};
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Error = styled.div`
  font-size: 15px;
  color: ${colors.lushLava};
`
