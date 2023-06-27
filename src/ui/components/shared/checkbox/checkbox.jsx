import React from 'react'

import { StyledCheckbox } from './styled-checkbox'

export const Checkbox = ({ color, children, ...restProps }) => {
  ;<StyledCheckbox color={color || 'primary'} {...restProps}>
    {children}
  </StyledCheckbox>
}
