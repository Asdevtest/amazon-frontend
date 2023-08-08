import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  soundOffIcon: {
    color: '#AEAEAE',
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.text.second,
    },
  },

  soundOnIcon: {
    color: theme.palette.primary.main,
    '&:hover': {
      cursor: 'pointer',
      color: '#0056B2',
    },
  },
}))
