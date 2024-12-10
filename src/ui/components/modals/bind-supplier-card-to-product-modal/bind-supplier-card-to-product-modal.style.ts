import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  title: {
    fontWeight: 600,
  },

  modalSelect: {
    width: '100%',
  },

  footerWrapper: {
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
}))
