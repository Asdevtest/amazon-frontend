import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  card: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: theme.palette.background.general,
  },

  tableWrapper: {
    marginTop: '20px',
    height: '48vh',
    width: '100%',
  },
}))
