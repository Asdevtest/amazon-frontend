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
    width: 50,
    height: 55,
  },

  bigSizeWrapper: {
    width: 130,
    height: 140,
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
    width: '47px !important',
    height: '55px !important',
  },

  bigSizeIcon: {
    width: '120px !important',
    height: '140px !important',
  },

  fileExtension: {
    position: 'absolute',
    bottom: '15%',
    width: 28,
    padding: '1px 0',
    fontSize: 9,
    lineHeight: '10px',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: theme.palette.background.second,
    background: theme.palette.fileIcons.file,
    borderRadius: 2,
  },

  middleSizeFileExtension: {
    width: 50,
    fontSize: 16,
    lineHeight: '22px',
  },

  bigSizeFileExtension: {
    width: 130,
    fontSize: 36,
    lineHeight: '50px',
  },
}))
