import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    height: '700px',
    width: '860px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },

  cascaderPanel: {
    height: '520px',
    background: theme.palette.background.general,

    '.ant-cascader-checkbox-inner': {
      borderRadius: '4px !important',
    },

    '.ant-cascader-menus': {
      width: '100%',

      '& > ul:nth-of-type(1)': {
        width: '250px',
      },

      '& > ul:nth-of-type(2)': {
        width: '580px',
      },
    },
  },

  skeleton: {
    height: '520px',
    borderRadius: '16px !important',

    '& > span': {
      height: '100% !important',
    },
  },

  specCascaderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginRight: 'auto',
  },

  specCascader: {
    width: '280px !important',

    '.ant-cascader-checkbox-inner': {
      borderRadius: '4px !important',
    },

    '.ant-cascader-menu-item-content': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    '.ant-cascader-menu': {
      width: '280px',
    },
  },

  specLabel: {
    width: 'fit-content',
    fontSize: '14px',
    lineHeight: '19px',
  },
}))
