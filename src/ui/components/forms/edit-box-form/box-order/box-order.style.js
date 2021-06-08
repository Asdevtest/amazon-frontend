import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  order: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fields: {
    display: 'flex',
    '& > div': {
      marginRight: theme.spacing(2),
    },
  },
  img: {
    width: '64px',
    height: '64px',
    marginRight: theme.spacing(2),
  },
  imgWithTitles: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  inputNumber: {
    width: '80px',
  },
  inputText: {
    width: '160px',
  },
}))
