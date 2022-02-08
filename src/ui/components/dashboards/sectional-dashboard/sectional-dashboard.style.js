import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  paper: {
    height: '94px',
    width: '282px',
    boxShadow: `0px 5px 19px 0px rgba(90, 97, 105, 0.12)`,
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '348px',
    },
  },
}))
