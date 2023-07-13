import React from 'react'

import { StyledCheckbox } from './styled-checkbox'

export const Checkbox = ({ color, title, children, ...restProps }) => {
  return (
    <StyledCheckbox title={title ?? ''} color={color || 'primary'} {...restProps}>
      {children}
    </StyledCheckbox>
  )
}
