import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  content: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: theme.palette.background.general,
    borderRadius: '16px',
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
}))
