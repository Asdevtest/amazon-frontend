import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  cell: {
    padding: '10px 0',
  },

  checkbox: {
    span: {
      borderRadius: '4px !important', // delete when completely switching to antd
    },
  },
}))
