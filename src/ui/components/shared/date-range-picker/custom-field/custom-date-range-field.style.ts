import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  field: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '240px',

    div: {
      button: {
        padding: 0,
        backgroundColor: 'transparent',
        transition: 'transform 0.3s ease',

        '&:hover': {
          transform: 'scale(0.9)',
          backgroundColor: 'transparent',
        },
      },
    },
  },

  input: {
    width: '100%',
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.primary.main,

    '&::placeholder': {
      color: theme.palette.primary.main,
    },
  },

  calendarIcon: {
    color: theme.palette.primary.main,
  },
}))
