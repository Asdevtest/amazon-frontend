import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    minWidth: 'fit-content',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: theme.palette.boxShadow.paper,
  },

  maskClassNameRoot: {
    overflow: 'hidden',
  },

  image: {
    objectFit: 'contain',
  },
}))
