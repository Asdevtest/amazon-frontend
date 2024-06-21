import { makeStyles } from 'tss-react/mui'

export const useEditTaskPriorityModalStyles = makeStyles()(theme => ({
  body: {
    maxWidth: 367,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 25,
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
  },

  reasonInput: {
    width: '100%',
    maxWidth: 367,
    minWidth: 367,
    minHeight: 75,
  },

  reasonLabel: {
    marginBottom: 5,
    fontSize: 14,
    color: theme.palette.text.second,
  },

  controls: {
    display: 'flex',
    gap: 10,

    button: {
      padding: '10px 25px',
    },
  },

  cancel: {
    color: theme.palette.text.general,
  },

  titleWrapper: {
    display: 'flex',
    gap: 10,
    alignItems: 'flex-end',
  },
}))
