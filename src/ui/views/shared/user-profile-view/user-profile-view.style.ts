import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  title: {
    fontSize: '18px',
    lineHeight: '25px',
  },

  tableWrapper: {
    width: '100%',
    height: '400px',

    '& > div': {
      height: '400px',
    },
  },
}))
