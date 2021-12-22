import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  root: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  infoWrapper: {
    flex: 2,
    display: 'flex',
  },
  resultWrapper: {
    flex: 5,
    display: 'flex',
  },
  commentWrapper: {
    flex: 3,
    display: 'flex',
  },
  text: {
    color: theme.palette.text.primary,
  },
}))
