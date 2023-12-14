import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  superBoxQtyWrapper: {
    width: '100%',
    height: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,

    padding: '5px 0',
  },
}))
