import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  button: {
    height: 32,
    width: 32,
    padding: 0,

    svg: {
      width: '20px !important',
      height: '20px !important',
    },
  },
}))
