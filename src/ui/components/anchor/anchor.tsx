import React from 'react'

import {Box} from '@material-ui/core'

export const Anchor = React.forwardRef((props, ref) => (
  <Box position="relative">
    <Box ref={ref} position="absolute" top={-56} />
    {props.children}
  </Box>
))
