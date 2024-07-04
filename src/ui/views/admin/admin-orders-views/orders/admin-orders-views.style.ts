import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },

  searchInput: {
    width: 400,
  },

  datagridWrapper: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    padding: '3px',
  },
}))
