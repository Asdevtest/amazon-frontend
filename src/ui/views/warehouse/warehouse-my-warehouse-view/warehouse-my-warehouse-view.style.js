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
    width: 600,
  },

  datagridWrapper: {
    marginTop: 20,
    height: '82vh',
    width: '100%',
  },
}))
