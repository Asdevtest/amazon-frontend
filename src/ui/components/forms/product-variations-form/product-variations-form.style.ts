import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    height: 'calc(100% - 75px)',
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    paddingRight: '15px',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  label: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },

  content: {
    paddingRight: '5px',
    height: '100%',
    maxHeight: '400px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  empty: {
    justifyContent: 'center',
    padding: 0,
  },
}))
