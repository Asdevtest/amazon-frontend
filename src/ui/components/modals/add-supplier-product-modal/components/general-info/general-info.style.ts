import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    gap: '25px',
  },

  productInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },

  selectsWrapper: {
    display: 'flex',
    gap: '10px',
    width: '100%',

    '.select': {
      flex: 1,
    },
  },

  uploadFiles: {
    flex: 1,
  },
}))
