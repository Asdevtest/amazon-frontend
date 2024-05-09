import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    width: '445px',
    minHeight: '168px',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    width: '350px',
    whiteSpace: 'pre-line',
    color: theme.palette.text.general,
  },

  titleWarning: {
    color: 'red',
  },

  button: {
    width: '118px',
    fontSize: '18px',
  },
}))
