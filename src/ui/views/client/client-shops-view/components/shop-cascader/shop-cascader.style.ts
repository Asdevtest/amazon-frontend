import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  cell: {
    padding: '10px 0',
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
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

  option: {
    width: '220px',
  },

  divider: {
    margin: 0,
  },

  footer: {
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
  },

  inputSearch: {
    width: '160px',
  },
}))
