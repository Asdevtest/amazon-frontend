import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  datagridWrapper: {
    flex: '1',
    overflow: 'hidden',
    padding: '3px',
  },

  searchInput: {
    width: '400px',
  },
}))
