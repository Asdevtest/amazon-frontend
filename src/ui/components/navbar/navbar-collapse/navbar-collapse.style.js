import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles(theme => ({
  root: {
    zIndex: 1200,
  },
  listItemText: {
    marginRight: '12px',
  },
  selected: {
    color: theme.palette.primary.main,
  },

  badge: {
    position: 'absolute',
    top: 2,
    left: 25,
    height: 20,
    width: 20,
    backgroundColor: 'rgba(0,0,0, .1)',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
}))
