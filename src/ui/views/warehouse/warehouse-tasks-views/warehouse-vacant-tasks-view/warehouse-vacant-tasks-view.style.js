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
    border: `1px solid ${theme.palette.primary.main}`,
    width: 405,
    height: '40px',
    fontSize: '16px',
    paddingLeft: '7px',
  },

  pickupOrdersButton: {
    padding: '0 20px',
    height: 40,
    color: '#fff',
    display: 'flex',
    gap: 10,
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
