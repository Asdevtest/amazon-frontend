import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
  },

  mainWrapper: {
    flex: '1 1 auto',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  main: {
    width: 'calc(100vw - 240px)',
    overflowY: 'auto',
    background: theme.palette.background.second,

    [theme.breakpoints.down(768)]: {
      width: '100vw',

      '&::-webkit-scrollbar': {
        width: 0,
      },
    },
  },

  mainShort: {
    width: 'calc(100vw - 75px)',
  },

  content: {
    padding: 10,
  },

  breadCrumbsWrapper: {
    padding: '10px 30px',
  },
}))
