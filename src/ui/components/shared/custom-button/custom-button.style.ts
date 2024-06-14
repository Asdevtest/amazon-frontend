import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
  },

  cell: {
    padding: '10px 0',
  },

  iconButton: {
    span: {
      display: 'flex',
      alignItems: 'center',
    },
  },
}))
