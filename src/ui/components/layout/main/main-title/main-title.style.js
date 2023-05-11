import {Typography} from '@mui/material'

import {withStyles} from 'tss-react/mui'

export const TitleTypography = withStyles(Typography, theme => ({
  root: {
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '23px',
    color: theme.palette.text.general,
    marginBottom: '32px',
  },
}))
