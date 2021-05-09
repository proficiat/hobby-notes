import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Front = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 144px;
  height: 44px;
  font-weight: 300;
  text-transform: uppercase;
  border-radius: 4px;
  font-size: 16px;
  color: ${({ theme }) => theme.blush};
  background: ${({ theme }) => theme.red};
  will-change: transform;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
`

const Shadow = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
`

const Button = styled.button`
  margin-top: 18px;
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;

  :hover {
    filter: brightness(110%);

    ${Front} {
      transform: translateY(-6px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }

    ${Shadow} {
      transform: translateY(4px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }
  }

  :active {
    ${Front} {
      transform: translateY(-2px);
      transition: transform 34ms;
    }

    ${Shadow} {
      transform: translateY(1px);
      transition: transform 34ms;
    }
  }

  focus:not(:focus-visible) {
    outline: none;
  }
`

const Edge = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(
    to left,
    hsl(340deg 100% 16%) 0%,
    hsl(340deg 100% 32%) 8%,
    hsl(340deg 100% 32%) 92%,
    hsl(340deg 100% 16%) 100%
  );
`

const WhimsicalButton = ({ children }) => {
  return (
    <Button>
      <Shadow />
      <Edge />
      <Front>{children}</Front>
    </Button>
  )
}

WhimsicalButton.propTypes = {
  children: PropTypes.node.isRequired,
}

export default WhimsicalButton
