import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  dapTitle: {
    color: theme.palette.text.second,
    fontSize: '12px',
  },

  dapBtn: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '200px',

    p: {
      width: '150px',
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
