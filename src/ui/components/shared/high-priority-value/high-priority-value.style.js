import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  body: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'flex-end',
    color: '#FF1616',
  },
  value: {
    fontSize: '12px',
  },
}))
