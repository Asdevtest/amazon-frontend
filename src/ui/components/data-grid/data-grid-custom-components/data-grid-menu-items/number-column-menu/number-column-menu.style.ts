import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  inputsWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
  },
}))
