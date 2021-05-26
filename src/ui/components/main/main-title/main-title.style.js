import {Typography, withStyles} from '@material-ui/core'

export const TitleTypography = withStyles({
  root: {
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '23px',
    color: 'rgba(61, 81, 112, 1)',
    marginBottom: '32px',
  },
})(Typography)
