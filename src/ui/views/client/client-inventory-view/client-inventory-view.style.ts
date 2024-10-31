import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  clickableCell: {
    transition: '.3s ease',

    div: {
      color: theme.palette.primary.main,
    },

    '&:hover': {
      borderRadius: 10,
      boxShadow: 'inset 0 0 10px rgba(247, 179, 7, .8)',
      textDecoration: 'underline',
    },
  },
}))
