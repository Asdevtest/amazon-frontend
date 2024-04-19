import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  commentContainer: {
    margin: 0,
    width: 115,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  commentClasses: {
    height: 45,
  },

  comment: {
    padding: 5,
    height: 45,
    fontSize: 12,
    lineHeight: '16px',
  },
}))
