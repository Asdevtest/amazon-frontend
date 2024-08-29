import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'flex-start',
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
}))
