import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    height: '700px',
    width: '880px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
  },

  content: {
    padding: '10px',
    flex: 1,
    background: theme.palette.background.general,
    borderRadius: '16px',
  },

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },

  cascader: {
    width: '400px',
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

  specCascaderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginRight: 'auto',
  },

  specCascader: {
    width: '280px !important',

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
