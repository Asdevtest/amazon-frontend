import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
    },
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '290px',
    height: '40px',

    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  addUserButton: {
    display: 'flex',
    gap: 10,

    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  tableWrapper: {
    marginTop: '20px',
    height: '79vh',
    width: '100%',
  },
}))
