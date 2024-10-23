import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  radioGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },

  radioOptionContainer: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: '12px',
  },

  iconContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconCreate: {
    height: '200px',
  },

  iconSelect: {
    height: '160px',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },
}))
