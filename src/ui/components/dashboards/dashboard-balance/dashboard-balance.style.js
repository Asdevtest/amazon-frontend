import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  balanceTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '72px',
    fontWeight: 400,
    lineHeight: '84px',
    marginBottom: theme.spacing(3),
  },
}))
