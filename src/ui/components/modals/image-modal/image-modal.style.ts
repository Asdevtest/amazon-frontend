import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalContainer: {
    height: '80vh',
    padding: 40,

    [theme.breakpoints.down(768)]: {
      maxHeight: '100vh',
      padding: 20,
    },
  },

  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },
  },

  body: {
    padding: '0 50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,

    [theme.breakpoints.down(768)]: {
      gap: 10,
      padding: 0,
    },
  },

  title: {
    maxWidth: 700,
    fontSize: '14px',
    lineHeight: '19px',
    wordBreak: 'break-all',
  },
}))
