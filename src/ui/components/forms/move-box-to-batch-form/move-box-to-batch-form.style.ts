import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '900px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  dataGridWrapper: {
    '& > div': {
      height: '42vh',
    },
  },
}))
