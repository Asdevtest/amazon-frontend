import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '500px',
  },

  modalText: {
    color: theme.palette.text.general,
  },

  saveButton: {
    marginTop: 15,
  },

  '@media (max-width: 768px)': {
    root: {
      minWidth: '280px',
      paddingTop: '20px',
    },
  },
}))
