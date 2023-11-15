import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: '38px',
    fontSize: '16px',
    paddingLeft: '7px',
  },

  datagridWrapper: {
    marginTop: '20px',
    height: '79vh',
    width: '100%',
  },

  openArchiveBtn: {
    padding: '0 30px',
    color: theme.palette.primary.main,
  },
}))
