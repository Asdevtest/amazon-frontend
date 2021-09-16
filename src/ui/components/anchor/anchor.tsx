import React from 'react'

import {Box} from '@material-ui/core'

export const Anchor = React.forwardRef(props => (
  <Box position="relative">
    <Box position="absolute" top={-56} />
    {props.children}
  </Box>
))
