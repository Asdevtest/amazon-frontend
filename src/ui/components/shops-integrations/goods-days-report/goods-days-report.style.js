import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
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

  shopsFiltersWrapper: {
    marginTop: 20,
  },

  dataGridWrapper: {
    marginTop: 20,
    height: '70vh',
    width: '100%',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
}))
