import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchInput: {
    width: 400,
  },

  tableWrapper: {
    marginTop: 20,
    height: '79vh',
    width: '100%',
  },
}))
