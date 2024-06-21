import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  activeTagsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 5,
  },
}))
