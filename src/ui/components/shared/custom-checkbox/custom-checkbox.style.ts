import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  cell: {
    width: '100%',
    padding: '5px 0',
  },

  checkbox: {
    span: {
      borderRadius: '4px !important', // delete when completely switching to antd
    },

    '& .ant-checkbox-inner': {
      width: 18,
      height: 18,
    },
  },
}))
