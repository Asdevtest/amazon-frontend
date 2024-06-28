import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  resultButtonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '445px',
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.general,
  },
}))
