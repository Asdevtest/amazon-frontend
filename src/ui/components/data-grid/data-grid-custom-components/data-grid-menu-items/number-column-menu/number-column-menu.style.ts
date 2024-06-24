import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  inputsWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  input: {
    width: 'calc(50% - 10px)',
    height: 30,
  },

  inputInnerSpace: {
    width: '100%',
  },
}))
