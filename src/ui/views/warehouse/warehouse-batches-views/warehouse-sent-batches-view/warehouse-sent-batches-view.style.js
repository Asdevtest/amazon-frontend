import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  searchInput: {
    width: 480,
  },

  datagridWrapper: {
    marginTop: '20px',
    height: '79vh',
    width: '100%',
  },
}))
