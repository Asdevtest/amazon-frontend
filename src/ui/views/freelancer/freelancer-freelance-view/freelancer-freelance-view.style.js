import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  title: {
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    marginBottom: 30,
  },

  btnsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: 'min-content',
  },

  button: {
    width: '100%',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap',

    p: {
      color: theme.palette.text.general,
    },
  },

  primary: {
    color: theme.palette.primary.main,
  },
}))
