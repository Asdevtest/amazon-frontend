import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
  },

  flexRowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
}))
