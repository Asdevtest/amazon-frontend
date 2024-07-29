import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
}))
