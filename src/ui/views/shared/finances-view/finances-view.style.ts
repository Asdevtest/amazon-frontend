import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: '10px',

    width: '100%',
    height: '100%',
  },

  tableWrapper: {
    flex: '1',
    overflow: 'auto',
    padding: '3px',
  },

  searchInput: {
    width: 350,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))
