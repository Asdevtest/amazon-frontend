import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  searchInputWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
  },

  searchInput: {
    width: 320,
  },

  dataGridWrapper: {
    marginTop: 20,
    height: '70vh',
    width: '100%',
  },

  badge: {
    height: 20,
    width: 'fit-content',
    background: theme.palette.primary.main,
    padding: '1px 6px',
    fontSize: '12px',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },

  attentionRow: {
    position: 'relative',
    background: theme.palette.background.yellowRow,

    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 1,
      top: 1,
      width: 5,
      height: '98%',
      background: '#C69109',
    },
  },
}))
