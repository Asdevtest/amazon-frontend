import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
  },

  interconnectedProductsBodyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: 240,
    overflowY: 'auto',
    paddingRight: '10px',
  },
}))
