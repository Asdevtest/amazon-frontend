import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    position: 'relative',
    width: 28,
    height: 28,
    display: 'flex',
    justifyContent: 'center',
  },

  middleSizeWrapper: {
    width: 54,
    height: 60,
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
    color: theme.palette.fileIcons.icon,
  },

  middleSizeIcon: {
    width: '50px !important',
    height: '60px !important',
  },

  fileExtension: {
    position: 'absolute',
    bottom: '15%',
    width: 28,
    padding: '1px 0',
    fontSize: 11,
    lineHeight: '11px',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: theme.palette.background.second,
    background: theme.palette.fileIcons.file,
    borderRadius: 2,
  },

  middleSizeFileExtension: {
    width: 54,
    fontSize: 18,
    lineHeight: '25px',
  },
}))
