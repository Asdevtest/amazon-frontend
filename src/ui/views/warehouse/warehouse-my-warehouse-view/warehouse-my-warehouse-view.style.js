import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  isDraftRow: {
    opacity: 0.5,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: 36,
  },

  datagridWrapper: {
    marginTop: 20,
    height: '82vh',
    width: '100%',
  },
}))
