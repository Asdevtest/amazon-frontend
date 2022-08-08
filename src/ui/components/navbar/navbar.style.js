import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles(theme => ({
  root: {
    zIndex: 1200,
  },
  paper: {
    boxShadow: `0px 1px 2px 0px rgba(225, 229, 235, 0.8),
                0px 13px 27px 0px rgba(90, 97, 105, 0.15)`,
    border: 'none',
  },
  positionStatic: {
    position: 'static',
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(7),
    flexShrink: 0,
    width: '280px',
  },
  logo: {
    marginTop: '15px',
    height: '100%',
    transform: 'scale(1.2)',
  },

  iconWrapper: {
    minWidth: '0',
    margin: '16px 16px 16px 11px',
    color: 'rgba(189, 194, 209, 1)',
  },
  icon: {
    fontSize: theme.spacing(3),
  },
}))
