import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    position: 'relative',
    width: 28,
    height: 28,
    display: 'flex',
    justifyContent: 'center',
  },

  hover: {
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
    cursor: 'pointer',

    '&:hover': {
      opacity: 0.8,
    },
  },

  icon: {
    width: '24px !important',
    height: '28px !important',
  },

  fileExtension: {
    position: 'absolute',
    bottom: '15%',

    width: 28,
    padding: '1px 0',

    fontSize: 12,
    lineHeight: '12px',
    textAlign: 'center',
    color: '#fff',
    background: theme.palette.fileIcons.file,
    borderRadius: 2,
  },
}))
