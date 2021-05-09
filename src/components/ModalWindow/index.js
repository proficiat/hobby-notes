import React, { useRef, useEffect } from 'react'

import PropTypes from 'prop-types'

import { Base, Content, StyledCloseIcon, Buttons, Button } from './styles'

const ModalWindow = React.memo(({ children, isShow, callback }) => {
  const contentRef = useRef(null)

  useEffect(() => {
    const handleClickOutsideContent = event => {
      const { current } = contentRef
      if (isShow && !current.contains(event.target)) {
        callback(false)
      }
    }
    window.addEventListener('click', handleClickOutsideContent)
    return () => {
      window.removeEventListener('click', handleClickOutsideContent)
    }
  }, [isShow, callback])

  return (
    <Base isShow={isShow}>
      <Content ref={contentRef}>
        <StyledCloseIcon onClick={() => callback(false)} />
        {children}
        <Buttons>
          <Button mr={28} onClick={() => callback(false)}>
            Cancel
          </Button>
          <Button onClick={() => callback(true)}>Confirm</Button>
        </Buttons>
      </Content>
    </Base>
  )
})

ModalWindow.propTypes = {
  callback: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isShow: PropTypes.bool.isRequired,
}

export default ModalWindow
