import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: '100%',
    maxHeight: 95,
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 5,
  },
}))
