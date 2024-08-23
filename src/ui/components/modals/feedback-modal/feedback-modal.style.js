import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '25px',
  },

  comments: {
    position: 'relative',
  },

  heightFieldAuto: {
    height: 'auto',
    width: '100%',
    padding: '0 0 30px 0',
  },

  commentLabelText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },

  fileIcon: {
    position: 'absolute',
    bottom: 25,
    right: 5,
    cursor: 'pointer',
  },

  fileIconActive: {
    color: theme.palette.primary.main,
  },
}))
