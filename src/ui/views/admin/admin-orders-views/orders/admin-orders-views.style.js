import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  searchInput: {
    width: 400,
    height: 36,
    overflow: 'visible',
    border: `1px solid ${theme.palette.primary.main}`,
  },

  filterBtnWrapper: {
    marginTop: 20,
  },

  datagridWrapper: {
    height: '76vh',
    width: '100%',
    marginTop: 20,
  },
}))
