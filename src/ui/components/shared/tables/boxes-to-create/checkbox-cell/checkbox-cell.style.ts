import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  checkboxWithLabelWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 155,
  },

  hidden: {
    display: 'none',
  },

  label: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  labelWrapper: {
    margin: 0,
  },

  transparencyCodesText: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: theme.palette.text.red,
  },
}))
