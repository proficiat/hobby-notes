import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  padding: 33px 80px;
  top: 0;
  right: 0;
  background: white;
  font-weight: 300;
  width: 380px;
`

export const Title = styled.h3`
  margin-bottom: 18px;
  font-weight: 300;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 11px;
  margin: 0 auto 8px auto;
`

export const Input = styled.input`
  height: 32px;
  background-color: white;
  outline: none;
  border: 1px solid #d8d9e0;
  font-weight: 300;
  width: 220px;
  margin-top: 4px;
  padding-left: 8px;
`

export const Button = styled.button`
  height: 32px;
  font-size: 12px;
  font-weight: 300;
  margin-top: 33px;
  width: 144px;
  background-color: white;
  border-color: #d8d9e0;
  outline: none;
  cursor: pointer;
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
