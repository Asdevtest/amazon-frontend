import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  button: {
    border: `1px solid ${theme.palette.input.customBorder}`,
  },

  mainFilterBtnInsert: {
    display: 'flex',
  },

  mainFilterBtnInsertText: {
    fontSize: 14,
    fontWeight: 600,
    marginLeft: 5,
  },
}))
