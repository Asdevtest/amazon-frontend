import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  presetItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '5px',
  },

  button: {
    width: '100%',
  },

  input: {
    width: '200px',
  },

  buttonWrapper: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },

  presetTitle: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  deleteIcon: {
    color: theme.palette.error.main,
  },

  updateButton: {
    color: theme.palette.primary.main,
  },

  presetEmptyFavorite: {
    width: '32px',
  },
}))
