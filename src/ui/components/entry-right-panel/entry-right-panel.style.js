import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  rightPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'column',

    // height: '100vh',
    // width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.main,
    padding: '48px 64px',
    [theme.breakpoints.down('sm')]: {
      padding: '8px',
    },
  },
  formWrapper: {
    justifySelf: 'center',

    minWidth: '300px',
    maxWidth: '600px',
    // flex: '1 1 300px',
    [theme.breakpoints.down('sm')]: {
      flex: '0 1 60%',
    },
  },
  formHeader: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: '32px',
    fontWeight: '600',
  },
  // divider: {
  //   margin: '8px 10px 16px'
  // },
  redirect: {
    margin: '0 30px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      color: theme.palette.primary.main,
      fontWeight: '500',
    },
  },

  redirectWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  version: {
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
    transform: 'translate(150%, 0)',
  },
}))
