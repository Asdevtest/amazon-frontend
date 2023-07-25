import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    height: 'calc(100vh - 60px)',
    display: 'flex',
  },

  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    background: theme.palette.background.second,
  },

  content: {},

  breadCrumbsWrapper: {
    padding: '10px 30px',
  },
}))
