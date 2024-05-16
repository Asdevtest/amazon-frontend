import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    backgroundColor: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 20,
  },

  infoContainer: {},

  titleContainer: {
    flex: 1,
  },
}))
