import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '5px 0',
    height: '100%',
    width: '990px',
    overflowY: 'auto',
  },
}))
