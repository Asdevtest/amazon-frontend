import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tagsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
  },
}))
