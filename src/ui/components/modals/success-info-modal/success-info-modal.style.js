import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    width: '485px',
    minHeight: '216px',
  },
  title: {
    textAlign: 'center',
    width: '350px',
  },

  button: {
    minWidth: '130px',
    fontSize: '18px',
  },
}))
