import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  searchInput: {
    width: 500,
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
