import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  sendOwnProductBtn: {
    marginBottom: theme.spacing(2),
  },
  redistributionWrapper: {},
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalMessage: {
    maxWidth: '400px',
  },
  modalMessageBtn: {
    alignSelf: 'flex-end',
  },
  btnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 0 10px',
  },
  leftBtnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  },

  heightFieldAuto: {
    height: 'auto',
    maxWidth: '380px',
    minWidth: '250px',
  },
  buttonsWrapper: {
    marginTop: '15px',
  },
  button: {
    marginRight: '10px',
  },

  tableWrapper: {
    minWidth: '100%',
  },

  isDraftRow: {
    opacity: '.5',
  },

  tasksWrapper: {
    marginTop: '30px',

    height: '60vh',
  },

  boxesFiltersWrapper: {
    marginBottom: '10px',
    display: 'flex',
  },

  selectedBoxesBtn: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',

    borderBottom: '5px solid #0460DE',
  },
}))
