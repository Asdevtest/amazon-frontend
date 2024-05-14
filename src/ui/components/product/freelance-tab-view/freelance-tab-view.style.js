import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  tableWrapper: {
    height: '75vh',
    width: '100%',
  },

  modalWrapper: {
    height: 614,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },

  searchInput: {
    width: '400px',
  },
}))
