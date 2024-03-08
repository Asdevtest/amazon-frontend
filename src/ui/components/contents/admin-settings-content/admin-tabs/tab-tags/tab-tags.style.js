import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchInput: {
    width: 290,
    height: 40,
    border: `1px solid ${theme.palette.primary.main}`,
  },

  datagridWrapper: {
    height: '70vh',
    width: '100%',
  },
}))
