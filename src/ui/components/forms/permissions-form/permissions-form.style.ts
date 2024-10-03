import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '880px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
  },

  content: {
    position: 'relative',
    height: '580px',
    padding: '10px',
    background: theme.palette.background.general,
    borderRadius: '16px',
  },

  searchPlaseholder: {
    position: 'absolute',
    top: 21,
    left: 25,
    color: theme.palette.text.second,
    opacity: 0.3,
    pointerEvents: 'none',
  },

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },

  cascader: {
    width: '400px',

    '.ant-select-clear': {
      display: 'none',
    },

    '.ant-select-selection-overflow': {
      '.ant-select-selection-item': {
        display: 'none !important',
      },
    },

    '.ant-select-selection-search': {
      width: '360px !important',
      height: '40px',
      margin: '0 !important',

      '.ant-select-selection-search-input': {
        padding: '10px !important',
      },
    },
  },

  cascaderPopup: {
    width: '860px',
    height: '515px',
    boxShadow: 'none',
    borderRadius: 0,
    background: theme.palette.background.general,

    '.ant-cascader-menus': {
      paddingTop: '10px',
      width: '100%',

      '& > ul:nth-of-type(1)': {
        width: '200px',
        paddingLeft: 0,
      },

      '& > ul:nth-of-type(2)': {
        width: '660px',
      },
    },

    '.ant-cascader-menu': {
      height: '505px',
    },
  },

  skeleton: {
    height: '560px',
    borderRadius: '16px !important',

    '& > span': {
      height: '100% !important',
    },
  },

  specCascader: {
    marginRight: 'auto',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  productOption: {
    padding: 0,
  },
}))
