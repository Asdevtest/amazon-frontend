import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  avatar: {
    minWidth: '48px',
    aspectRatio: '1 / 1',
  },

  favoritesIcon: {
    color: theme.palette.primary.main,
  },
}))
