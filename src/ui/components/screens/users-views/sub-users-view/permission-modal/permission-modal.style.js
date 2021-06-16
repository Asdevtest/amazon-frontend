import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  boxWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  boxResearcher: {
    display: 'flex',
  },
  buttonBox: {
    textAlign: 'right',
  },
  select: {
    width: '100%',
  },
  saveBtn: {},
}))
