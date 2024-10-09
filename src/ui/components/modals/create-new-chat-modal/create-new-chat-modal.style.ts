import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    gap: '10px',
    width: '450px',
  },

  userSelect: {
    width: '100%',
  },

  title: {
    fontWeight: 600,
  },

  avatarContainer: {
    display: 'flex',
    alignSelf: 'center',
    height: 150,
    width: 150,
  },

  createButton: {
    alignSelf: 'flex-end',
    width: 'fit-content',
  },

  userOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
}))
