import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  tableWrapper: {
    marginTop: '32px',
    width: '100%',
    height: '100%',
  },
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  heightFieldAuto: {
    height: 'auto',
    maxWidth: '380px',
    minWidth: '250px',
  },
  buttonsWrapper: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: '10px',
  },

  rowCancelBtn: {
    marginLeft: '10px',
  },
}))
