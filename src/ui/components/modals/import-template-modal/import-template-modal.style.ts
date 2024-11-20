import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '300px',
  },

  title: {
    fontWeight: 600,
  },

  buttonsWrapper: {
    alignSelf: 'flex-end',
    display: 'flex',
    gap: '10px',
  },

  uploadFilesInputWrapper: {
    marginTop: '0px',
    gap: '10px',
  },
}))
