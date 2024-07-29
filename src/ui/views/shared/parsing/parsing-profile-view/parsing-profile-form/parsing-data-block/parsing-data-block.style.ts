import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    gridArea: 'a',
    width: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '5px',
  },

  text: {
    width: '80%',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center',
  },
}))
