import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  button: {
    width: '144px',
    height: '40px',
  },

  modalTitle: {
    color: theme.palette.text.general,
  },
  cancelButton: {
    color: '#001029',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: 20,
  },
  mainWrapper: {
    minWidth: '460px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  '@media (max-width: 768px)': {
    mainWrapper: {
      minWidth: '280px',

      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    modalTitle: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 600,
    },
    labelField: {
      fontSize: '14px',
      lineHeight: '19px',
      color: '#656565',
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
}))
