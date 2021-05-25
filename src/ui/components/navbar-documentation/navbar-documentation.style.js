import {makeStyles} from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    boxShadow: `0px 1px 2px 0px rgba(225, 229, 235, 0.8),
                0px 13px 27px 0px rgba(90, 97, 105, 0.15)`,
  },
  positionStatic: {
    position: 'static',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(7),
    flexShrink: 0,
  },
  iconWrapper: {
    minWidth: '0',
    margin: '16px 16px 16px 11px',
    color: 'rgba(189, 194, 209, 1)',
  },
  selected: {
    color: 'rgba(0, 123, 255, 1)',
  },
  icon: {
    fontSize: theme.spacing(3),
  },
  collapseContainer: {
    transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1) 15550ms',
  },
}))
