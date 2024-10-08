import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  tableWrapper: {
    height: '73vh',
    width: '100%',
  },

  modalWrapper: {
    height: 594,
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
