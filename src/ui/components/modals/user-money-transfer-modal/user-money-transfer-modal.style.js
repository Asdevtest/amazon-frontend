import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },

  link: {
    width: '300px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },

  title: {
    fontSize: '24px',
    color: theme.palette.text.general,
  },

  text: {
    color: theme.palette.text.second,
  },

  button: {
    width: '121px',
    height: '40px',
  },
}))
