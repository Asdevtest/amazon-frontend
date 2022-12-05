import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    minWidth: '500px',

    display: 'flex',
    flexDirection: 'column',
  },

  modalText: {
    color: theme.palette.text.general,
  },
}))
