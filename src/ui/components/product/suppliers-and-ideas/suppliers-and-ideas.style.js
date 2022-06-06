import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    gap: '5px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
