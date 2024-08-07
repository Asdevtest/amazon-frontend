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
      height: '410px',
    },

    '.ant-cascader-checkbox-inner': {
      borderRadius: '4px !important',
    },
  },

  label: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },

  option: {
    width: '150px',
  },
}))
