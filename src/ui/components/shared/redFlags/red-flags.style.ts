import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  title: {
    marginBottom: '5px',
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },

  search: {
    marginBottom: '10px',
  },

  checkboxes: {
    height: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    gap: '5px',
  },

  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  empty: {
    justifyContent: 'center',
  },
}))
