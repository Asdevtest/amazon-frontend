import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    width: '445px',
    minHeight: '168px',
    [theme.breakpoints.down(768)]: {
      width: '260px',
      minHeight: '120px',
      gap: '20px',
    },
  },
  title: {
    textAlign: 'center',
    width: '350px',
    whiteSpace: 'pre-line',

    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      textAlign: 'center',
      width: '280px',
      fontSize: '14px',
    },
  },

  titleWarning: {
    color: 'red',
  },

  button: {
    width: '118px',
    fontSize: '18px',
  },
}))
