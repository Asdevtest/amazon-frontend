import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  mainWrapper: {
    display: 'flex',
    gap: '40px',
  },
  leftCardWrapper: {
    width: '1016px',
    height: '525px',
    padding: '40px 30px',
  },

  rightCardWrapper: {
    width: '524px',
    height: '525px',
    padding: '40px 30px',
  },
}))
