import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    gridArea: 'a',
    width: '200px',
  },

  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '5px',
  },

  content: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: '16px',
  },

  info: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '10px',
  },

  text: {
    width: '80%',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center',
  },

  title: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: '600',
    textAlign: 'left',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
}))
