import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    minWidth: '500px',

    display: 'flex',
    flexDirection: 'column',

    gap: 40,
    alignItems: 'center',
  },

  modalText: {
    color: theme.palette.text.general,
  },
}))
