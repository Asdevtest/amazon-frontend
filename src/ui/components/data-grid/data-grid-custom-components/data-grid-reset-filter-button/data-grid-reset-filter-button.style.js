import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainFilterBtnInsert: {
    display: 'flex',
  },

  mainFilterBtnInsertText: {
    fontSize: 14,
    fontWeight: 600,
    marginLeft: 5,
  },
}))
