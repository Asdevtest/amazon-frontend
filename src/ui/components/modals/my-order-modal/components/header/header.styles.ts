import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    maxHeight: 270,
    display: 'flex',
    // flexWrap: 'wrap',
    gap: 30,
  },
}))
