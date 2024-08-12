import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  patchNotes: {
    height: 420,
    overflowY: 'auto',
    paddingRight: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    scrollBehavior: 'smooth',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },

  addButton: {
    padding: 0,
    height: 'max-content',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },
}))
