import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 650,
    display: 'flex',
    flexDirection: 'column',
  },

  modalText: {
    color: theme.palette.text.general,
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    marginBottom: 30,
  },

  userWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  feedbackText: {
    margin: '10px 0 30px',
    width: '100%',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    color: theme.palette.text.general,
    overflow: 'auto',
    height: 152,
  },

  label: {
    fontSize: 14,
    color: theme.palette.text.second,
  },

  date: {
    color: theme.palette.text.second,
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 30,
  },

  closeBtn: {
    color: theme.palette.text.general,
  },
}))
