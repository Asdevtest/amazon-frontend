import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  searchInput: {
    width: 400,
  },

  datagridWrapper: {
    marginTop: '20px',
    height: '82vh',
    width: '100%',
  },

  usersOnlineWrapper: {
    position: 'relative',
    minWidth: 205,
    '&:after': {
      content: '""',
      position: 'absolute',
      margin: 'auto',
      bottom: 0,
      top: 0,
      right: 0,
      width: 7,
      height: 7,
      backgroundColor: '#28a745',
      borderRadius: '50%',
    },
  },
}))
