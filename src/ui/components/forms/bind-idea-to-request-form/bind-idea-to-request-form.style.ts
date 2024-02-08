import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  tableWrapper: {
    height: 358,
  },

  columnHeaderTitleContainer: {
    padding: '0 !important',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
