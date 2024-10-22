import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  block: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '60px',
  },

  user: {
    borderRadius: '16px',
    boxShadow: theme.palette.boxShadow.paper,
  },

  response: {
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },
}))
