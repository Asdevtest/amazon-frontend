import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  title: {
    padding: '8px 16px 0',
  },

  cascader: {
    '.ant-cascader-menu': {
      height: '140px',
      width: '280px',
      paddingBottom: 8,
    },

    '.ant-cascader-checkbox-inner': {
      borderRadius: '4px !important',
    },
  },

  cascaderPanel: {
    display: 'block',
    border: 'none',
    borderRadius: 0,

    '.ant-cascader-menu': {
      height: '204px',
    },

    '.ant-empty-small': {
      height: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },

    '.ant-cascader-menu-item-content': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    '.ant-cascader-menus': {
      width: '100%',
    },
  },

  label: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },

  divider: {
    margin: 0,
  },

  header: {
    padding: '8px 16px 0',
  },

  footer: {
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '10px',
  },

  inputSearch: {
    width: '100%',
  },
}))
