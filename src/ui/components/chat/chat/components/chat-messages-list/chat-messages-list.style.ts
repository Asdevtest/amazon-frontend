import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  list: {
    flex: 1,
    '& > div': {
      padding: '10px',
      '& > div': {
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
}))
