import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    padding: '0 20px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    lineHeight: 'inherit',
    background: theme.palette.background.general,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '5px',
    marginRight: 'auto',
  },

  title: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '25px',
    color: theme.palette.text.second,
  },

  toastContainer: {
    background: `${theme.palette.background.general} !important`,

    button: {
      svg: {
        color: theme.palette.text.general,
      },
    },
  },
}))
