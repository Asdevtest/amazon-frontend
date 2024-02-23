import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  ideaActions: {
    display: 'flex',
    gap: 10,
    padding: '16px 0',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
  },
}))
