import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'default',
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
    fill: theme.palette.fileIcons.icon,
  },

  fileExtension: {
    position: 'absolute',
    bottom: '15%',
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: theme.palette.background.second,
    borderRadius: 2,
  },
}))
