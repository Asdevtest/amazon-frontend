import React, {FC, forwardRef} from 'react'

import {Box} from '@material-ui/core'

interface Props {}

export const Anchor: FC<Props> = forwardRef(({children}) => (
  <Box position="relative">
    <Box position="absolute" top={-56} />
    {children}
  </Box>
))
