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

  imagesList: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    gap: 18,
    paddingRight: 20,
    maxHeight: 'calc(80vh - 80px)',

    [theme.breakpoints.down(768)]: {
      maxHeight: '273px',
      overflow: 'auto',
      paddingRight: 0,
      gap: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
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
