import {Typography} from '@mui/material'

import {withStyles} from 'tss-react/mui'

export const TitleTypography = withStyles(Typography, () => ({
  root: {
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '23px',
    color: 'rgba(61, 81, 112, 1)',
    marginBottom: '32px',
  },
}))
