import React from 'react'

import {StyledPaper} from './card.style'

export const Card = props => {
  ;<StyledPaper className={props.className} style={props.style}>
    {props.children}
  </StyledPaper>
}
