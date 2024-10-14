import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  title: {
    padding: '8px 16px 0',
  },

  cascader: {
    '.ant-cascader-menu': {
      height: '196px',
    },
  },

  cascaderPanel: {
    display: 'block',
    border: 'none',
    borderRadius: 0,

    '.ant-empty-small': {
      height: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    '.ant-cascader-menu-item-content': {
      width: '200px',
    },
  },

  divider: {
    margin: 0,
  },

  header: {
    padding: '8px 16px 0',
  },

  footer: {
    padding: '0 16px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '10px',
  },

  inputSearch: {
    width: '100%',
  },
}))
