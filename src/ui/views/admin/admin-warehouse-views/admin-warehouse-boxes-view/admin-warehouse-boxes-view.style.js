import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '400px',
    height: 36,
    overflow: 'visible',
  },

  tableWrapper: {
    marginTop: 20,
    height: '80vh',
    width: '100%',
  },
}))
