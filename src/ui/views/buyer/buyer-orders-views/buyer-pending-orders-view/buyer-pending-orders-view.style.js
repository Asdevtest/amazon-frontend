import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: 36,
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },

  dataGridWrapper: {
    height: '82vh',
    width: '100%',
  },
}))
