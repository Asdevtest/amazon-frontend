import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },

  searchInput: {
    width: '450px',
  },
}))