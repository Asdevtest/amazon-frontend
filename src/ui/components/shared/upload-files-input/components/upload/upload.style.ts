import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  minimazed: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 10,
  },

  uploadInputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  uploadInputWrapperMinimazed: {
    width: '35%',
  },

  attachFiles: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  uploadButton: {
    position: 'relative',
    width: '100%',
    height: 80,
    color: theme.palette.text.general,
    background: theme.palette.background.second,
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: 20,
    transition: '0.3s ease',
    opacity: 1,

    '&:hover': {
      opacity: 0.8,
    },
  },

  uploadButtonMinimized: {
    height: 32,
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    color: theme.palette.primary.main,
  },

  uploadInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 20,
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'pointer',
  },
}))
