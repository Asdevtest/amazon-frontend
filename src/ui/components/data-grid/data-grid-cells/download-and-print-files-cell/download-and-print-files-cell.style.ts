import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  dapTitle: {
    color: theme.palette.text.second,
    fontSize: '12px',
  },

  dapBtn: {
    padding: '0px 44px',
    height: 30,
    fontSize: '14px',
    maxWidth: '200px !important',
    minWidth: '200px !important',
    lineHeight: 1,
    span: {
      maxWidth: '92px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },

  printIcon: {
    color: theme.palette.primary.main,
  },

  notAddedText: {
    marginLeft: '25px',
    width: 'fit-content',
  },
}))
