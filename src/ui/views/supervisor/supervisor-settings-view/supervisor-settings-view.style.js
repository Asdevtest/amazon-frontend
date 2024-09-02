import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
}))
