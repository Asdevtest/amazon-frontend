import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  modalMessage: {
    maxWidth: '400px',
  },
  modalMessageBtn: {
    alignSelf: 'flex-end',
  },
  buttonsWrapper: {
    display: 'flex',
    gap: '10px',
  },
  cancelBtn: {
    marginLeft: '10px',
  },

  titleWarning: {
    color: 'red',
  },
}))
