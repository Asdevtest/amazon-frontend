import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  content: {
    marginTop: '20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: theme.palette.background.general,
    borderRadius: '16px',
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  treeSelect: {
    '.ant-tree-list-holder-inner': {
      paddingRight: '10px',
      maxHeight: '650px !important',
      overflow: 'auto',
    },

    '.ant-tree-title': {
      minHeight: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      wordBreak: 'break-word',

      '& > span:nth-of-type(2)': {
        display: 'flex',
        gap: '5px',
        marginLeft: '20px',
      },
    },
  },

  highlight: {
    color: theme.palette.text.highlight,
  },
}))