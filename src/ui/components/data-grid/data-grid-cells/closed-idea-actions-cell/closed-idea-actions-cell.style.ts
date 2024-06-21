import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  buttonsWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 0',
  },
}))
