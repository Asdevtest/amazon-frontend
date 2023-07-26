import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    height: 'calc(100vh - 60px)',
    display: 'flex',

    [theme.breakpoints.down(768)]: {
      height: 'calc(100vh - 52px)',
    },
  },

  main: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    background: theme.palette.background.second,

    [theme.breakpoints.down(768)]: {
      '&::-webkit-scrollbar': {
        width: 0,
      },
    },
  },

  content: {
    padding: 10,
  },

  breadCrumbsWrapper: {
    padding: '10px 30px',
  },
}))
