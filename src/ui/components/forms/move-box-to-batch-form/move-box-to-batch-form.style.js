import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  batchesExistBlock: {
    width: '900px',
  },

  title: {
    textAlign: 'center',
    color: theme.palette.text.general,
  },

  standartText: {
    color: theme.palette.text.general,
  },

  messageWrapper: {
    width: '460px',
    textAlign: 'center',
    margin: '30px 0',
    color: theme.palette.text.general,
  },

  tableWrapper: {
    display: 'flex',
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
  },

  btnsSubWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
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
