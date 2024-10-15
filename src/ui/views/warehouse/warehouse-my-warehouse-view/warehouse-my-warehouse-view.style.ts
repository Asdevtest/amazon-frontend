import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  isDraftRow: {
    opacity: 0.5,
  },

  searchInput: {
    width: '650px',
  },
}))
