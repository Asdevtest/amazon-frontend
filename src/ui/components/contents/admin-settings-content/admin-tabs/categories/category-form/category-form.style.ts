import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '.ant-form-item': {
      margin: 0,
    },
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  treeSelect: {
    '.ant-select-tree-title, .ant-select-selection-item': {
      span: {
        display: 'none',
      },
    },
  },
}))
