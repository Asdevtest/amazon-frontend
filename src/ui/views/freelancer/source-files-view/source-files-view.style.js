import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  dataGridWrapper: {
    marginTop: 20,
    height: '80vh',
    width: '100%',
  },
}))
