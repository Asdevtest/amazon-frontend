import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  chatViewWrapper: {
    flex: 1,
    display: 'flex',
  },

  chat: {
    height: '100%',
    width: '200px',
    backgroundColor: 'red',

    '@container (min-width: 1200px)': {
      backgroundColor: 'blue',
    },
  },
}))
