import React from 'react'

import {Box} from '@material-ui/core'

export const Anchor = React.forwardRef((props, ref) => (
  <Box position="relative">
    <Box position="absolute" ref={ref} top={-56} />
    {props.children}
  </Box>
))
