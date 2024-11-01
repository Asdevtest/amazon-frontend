import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    gap: 5,
  },

  cell: {
    width: '100%',
    padding: '5px 0',
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },

  rowRight: {
    flexDirection: 'row-reverse',
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
