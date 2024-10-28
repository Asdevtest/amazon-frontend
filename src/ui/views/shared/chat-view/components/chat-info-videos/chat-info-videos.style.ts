import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  videoWrapper: {
    width: 'calc(100% / 3 - 5px)',
    height: '150px',
    cursor: 'pointer',
  },
}))
