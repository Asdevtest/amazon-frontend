import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tableWrapper: {
    height: '72vh',
    width: '100%',
  },

  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 40,
    flexWrap: 'wrap',

    [theme.breakpoints.down(1282)]: {
      gap: 20,
    },
  },

  searchInput: {
    width: 550,
  },

  downloadIcon: {
    color: '#fff',
  },

  disabledDownloadIcon: {
    color: theme.palette.button.disabledText,
  },

  successRow: {
    boxShadow: 'inset 0 0 35px rgba(0, 255, 0, .5)',
  },
}))
