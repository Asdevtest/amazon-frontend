import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tableWrapper: {
    height: '72vh',
    width: '100%',
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 405,
    height: '40px',
    fontSize: '16px',
    paddingLeft: '7px',
  },
}))
