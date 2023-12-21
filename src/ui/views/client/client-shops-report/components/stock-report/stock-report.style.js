import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  shopsFiltersWrapper: {
    marginTop: 20,
  },

  button: {
    marginBottom: 5,
    color: theme.palette.text.general,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
  },

  tableWrapper: {
    marginTop: 20,
    height: 'calc(100vh - 300px)',
    width: '100%',
  },
}))
