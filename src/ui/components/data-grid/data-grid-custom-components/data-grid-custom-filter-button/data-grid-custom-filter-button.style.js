import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainFilterBtn: {
    color: theme.palette.primary.main,
    border: 'none',
    height: 44,
  },

  mainFilterBtnInsert: {
    display: 'flex',
  },

  mainFilterBtnInsertText: {
    fontWeight: 600,
    marginLeft: 5,
  },
}))
