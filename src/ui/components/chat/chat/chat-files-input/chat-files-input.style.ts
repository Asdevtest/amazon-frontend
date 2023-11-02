import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    height: 170,
    padding: '10px 50px',
    background: theme.palette.background.general,

    [theme.breakpoints.down(1024)]: {
      padding: '10px 30px',
    },

    [theme.breakpoints.down(768)]: {
      padding: 10,
      height: 'auto',

      '& > div ': {
        width: '100%',
      },

      '& > div > div ': {
        flexDirection: 'column',
      },
    },
  },
}))
