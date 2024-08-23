import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    opacity: 1,
    transition: '0.3s ease',

    '&:hover': {
      opacity: 0.8,
    },
  },

  hover: {
    '&:hover': {
      'svg, p': {
        opacity: 0.5,
      },

      a: {
        opacity: 1,
      },
    },
  },

  icon: {
    fill: theme.palette.fileIcons.icon,
    transition: 'opacity 0.3s ease',
  },

  fileExtension: {
    position: 'absolute',
    bottom: '15%',
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: theme.palette.background.second,
    borderRadius: 2,
    transition: 'opacity 0.3s ease',
  },

  link: {
    position: 'absolute',
    height: '80%',
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    wordBreak: 'break-all',
    transition: 'opacity 0.3s ease',
  },
}))
