import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  label: {
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.palette.text.primary,
    fontWeight: '600',
  },

  title: {
    fontSize: '24px',
    lineHeight: '20px',
    color: theme.palette.text.secondary,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '24px',
  },

  rightBoxComments: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  heightFieldAuto: {
    height: 'auto',
    width: '100%',
    padding: 0,
  },

  errorActive: {
    borderColor: 'red',
  },

  buttonsWrapper: {
    position: 'fixed',
    bottom: 50,
    zIndex: 50,
    display: 'grid',
    gridTemplateColumns: 'repeat(4,auto)',
    justifyContent: 'flex-end',
    gap: 20,
    marginBottom: '20px',
    width: '38%',
  },

  buttonWrapper: {
    position: 'fixed',
    bottom: 50,
    right: 60,
    zIndex: 150,
    width: '33%',
    display: 'grid',
  },

  rightBoxCommentsWrapper: {
    display: 'flex',
    width: '50%',
  },
}))
