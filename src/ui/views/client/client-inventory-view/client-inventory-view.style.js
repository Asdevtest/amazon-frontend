import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  clickableCell: {
    transition: '.3s ease',

    '&:hover': {
      borderRadius: 10,
      boxShadow: 'inset 0 0 10px rgba(247, 179, 7, .8)',
    },
  },
}))
