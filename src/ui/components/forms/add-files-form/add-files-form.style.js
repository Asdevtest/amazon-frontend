import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    minWidth: '500px',
  },

  modalText: {
    color: theme.palette.text.general,
  },

  '@media (max-width: 768px)': {
    root: {
      minWidth: '280px',
      paddingTop: '20px',
    },
  },
}))
