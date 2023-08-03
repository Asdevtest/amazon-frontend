import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: 170,
    padding: '10px 50px',
    background: theme.palette.background.general,

    [theme.breakpoints.down(768)]: {
      padding: 10,

      '& > div > div > div:nth-of-type(1)': {
        maxWidth: '100%',
      },

      '& > div > div > div:nth-of-type(2)': {
        display: 'none',
      },
    },
  },
}))
