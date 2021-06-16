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
}))
