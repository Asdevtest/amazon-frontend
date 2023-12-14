import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  redFlags: {
    padding: '10px 0',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,

    p: {
      padding: 0,
      margin: 0,
    },
  },
}))
