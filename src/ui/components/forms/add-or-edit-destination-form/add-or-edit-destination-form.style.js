import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '400px',
    padding: '10px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  form: {
    marginTop: '20px',
  },

  label: {
    margin: 0,
  },

  footerWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  btnsWrapper: {
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
}))
