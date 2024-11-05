import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  field: {
    margin: 0,
  },

  contactField: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    width: 'calc(100% / 4)',

    '.icon': {
      display: 'none',
    },

    '&:hover': {
      '.icon': {
        display: 'block',
      },
    },
  },

  input: {
    width: 'unset',
  },
}))
