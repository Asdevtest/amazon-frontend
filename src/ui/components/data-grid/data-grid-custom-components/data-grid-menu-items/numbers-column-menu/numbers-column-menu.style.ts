import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
  },
}))
