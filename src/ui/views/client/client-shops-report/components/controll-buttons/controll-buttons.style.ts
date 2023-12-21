import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: 20,
  },
}))
