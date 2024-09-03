import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  chatWrapper: {
    marginTop: '20px',
    width: '100%',
    height: '780px',
  },

  additionalButtonsWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
}))
