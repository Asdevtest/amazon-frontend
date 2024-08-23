import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
  },

  cell: {
    padding: '10px 0',
  },

  button: {
    borderRadius: 16, // delete when completely switching to antd
  },

  iconButton: {
    span: {
      display: 'flex',
      alignItems: 'center',
    },
  },
}))
