import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: 500,
    maxHeight: '600px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  warning: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '25px',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },

  asins: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },

  asin: {
    fontSize: '14px',
    lineHeight: '19px',
  },
}))
