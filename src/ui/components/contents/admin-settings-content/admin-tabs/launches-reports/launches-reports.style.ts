import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
    padding: 20,
    borderRadius: '20px',
    backgroundColor: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
  },

  title: {
    fontWeight: 600,
  },

  label: {
    fontSize: 14,
    fontWeight: 600,
  },

  select: {
    width: 80,
  },

  input: {
    width: 120,
  },
}))
