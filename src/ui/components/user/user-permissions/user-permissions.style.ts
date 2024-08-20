import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    width: '100%',
    height: '100%',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  datagridWrapper: {
    flex: 1,
    padding: '3px',
    overflow: 'hidden',
    width: '100%',
  },

  searchInput: {
    width: 400,
  },
}))
