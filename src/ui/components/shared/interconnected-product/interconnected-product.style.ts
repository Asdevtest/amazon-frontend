import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
  },

  product: {
    width: '160px',
  },

  parentVariationIcon: {
    color: theme.palette.primary.main,
  },
}))
