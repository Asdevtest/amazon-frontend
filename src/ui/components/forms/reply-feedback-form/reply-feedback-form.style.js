import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: 650,
    display: 'flex',
    flexDirection: 'column',
  },

  userWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  modalText: {
    color: theme.palette.text.general,

    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',

    marginBottom: 30,
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
    alignSelf: 'flex-end',
    display: 'flex',
    gap: 30,
  },

  closeBtn: {
    color: theme.palette.text.general,
  },
}))
