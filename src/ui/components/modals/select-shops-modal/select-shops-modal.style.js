import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    minHeight: 150,
    padding: 10,
  },

  title: {
    marginBottom: 20,
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
    textAlign: 'center',
    color: theme.palette.text.general,
  },

  fieldLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  message: {
    fontSize: '14px',
    lineHeight: '19px',
    textAlign: 'center',
    color: theme.palette.text.general,
  },

  buttons: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    gap: 30,
  },

  customSubMainWrapper: {
    width: '340px !important',
  },

  customItemsWrapper: {
    padding: '10px',
    maxHeight: '200px !important',
  },
}))
