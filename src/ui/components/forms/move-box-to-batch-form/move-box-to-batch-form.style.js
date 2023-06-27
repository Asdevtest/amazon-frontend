import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  batchesExistBlock: {
    width: '900px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  title: {
    textAlign: 'center',
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '22px',
    },
  },

  standartText: {
    color: theme.palette.text.general,
  },

  messageWrapper: {
    width: '460px',
    textAlign: 'center',
    margin: '30px 0',
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      width: '214px',
      textAlign: 'center',
      margin: '0 auto',
      marginTop: '10px',

      '& > :nth-of-type(n)': {
        fontSize: '12px',
        lineHeight: '16px',
      },
    },
  },

  tableWrapper: {
    marginTop: '10px',
    height: '37vh',
  },

  btnsWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  btnsSecondWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '460px',
    [theme.breakpoints.down(768)]: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '300px',
      gap: 10,
    },
  },

  btnsSubWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  cancelBtn: {
    marginLeft: '40px',
    color: theme.palette.text.general,

    [theme.breakpoints.down(768)]: {
      marginLeft: 0,
    },
  },

  moveBox: {
    color: '#fff',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },

  titleSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
}))
