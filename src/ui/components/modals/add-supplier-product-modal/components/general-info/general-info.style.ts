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
    width: 'calc(60% - 25px)',
  },

  selectsWrapper: {
    display: 'flex',
    gap: '10px',
    width: '100%',

    '.select': {
      width: 'calc(100% / 2 - 5px)',
    },
  },

  uploadFiles: {
    flex: 1,
  },
}))
