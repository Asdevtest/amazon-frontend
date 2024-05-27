import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  filterItemsWrapper: {
    width: '100%',
    height: '245px',
    overflowY: 'auto',
    textAlign: 'center',

    boxShadow: theme.palette.boxShadow.filter,
  },

  loaderWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  noOptionText: {
    color: theme.palette.text.second,
  },
}))
