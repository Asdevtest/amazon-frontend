import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    padding: '5px 0',
  },

  rate: {
    li: {
      cursor: 'pointer !important',
    },
  },
}))
