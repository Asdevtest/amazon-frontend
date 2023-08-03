import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5,

    [theme.breakpoints.down(768)]: {
      padding: '0 5px',
    },
  },

  groupText: {
    [theme.breakpoints.down(768)]: {
      fontSize: 14,
    },
  },

  groupTitle: {
    fontWeight: 600,
    maxWidth: 200,

    [theme.breakpoints.down(768)]: {
      maxWidth: 160,
      fontSize: 14,
      wordWrap: 'break-word',
    },
  },

  changeTitleWrapper: {
    display: 'flex',
    marginBottom: 30,
    alignItems: 'center',

    [theme.breakpoints.down(768)]: {
      marginBottom: 20,
    },
  },

  changeIcon: {
    color: theme.palette.primary.main,
  },

  groupImage: {
    width: 150,
    height: 100,
    objectFit: 'contain',
    margin: '0 10px',
    cursor: 'pointer',
    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },

    [theme.breakpoints.down(768)]: {
      margin: '0 5px',
      width: 50,
      height: 50,
    },
  },
}))
