import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    borderRadius: 20,

    backgroundColor: theme.palette.background.general,
    padding: '15px 20px',
    zIndex: 999,

    marginBottom: 20,

    display: 'flex',
    // alignItems: 'center',
    // border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: '0px 2px 40px 2px rgba(0, 0, 0, 0.4)',

    cursor: 'pointer',
    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  messageText: {
    marginTop: 5,
    color: theme.palette.text.general,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    minHeight: 50,
    maxHeight: 150,
    minWidth: 150,
    maxWidth: 250,
  },

  filesText: {
    color: theme.palette.text.second,
    marginTop: 10,
  },

  closeIcon: {
    color: '#C4C4C4',
    cursor: 'pointer',
    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  messageDate: {
    fontSize: 12,
    color: theme.palette.text.second,
  },

  avatarWrapper: {
    width: 53,
    height: 53,
    marginRight: 20,
  },

  rightSiteWrapper: {
    marginLeft: 20,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  centerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))
