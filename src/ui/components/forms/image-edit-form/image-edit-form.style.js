import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '45vh',
    height: '45vh',
    objectFit: 'contain',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 50,
  },

  btnsSubWrapper: {
    display: 'flex',
    gap: 20,
  },

  cancelBtn: {
    color: theme.palette.text.general,
  },
}))
