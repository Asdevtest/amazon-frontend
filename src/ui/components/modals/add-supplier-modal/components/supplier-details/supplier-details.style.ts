import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    gap: '25px',
  },

  supplierDetailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',

    width: 'calc(50% - 25px)',
  },

  uploadFiles: {
    flex: 1,
  },

  uploadFilesWrapper: {
    marginTop: '0px',
    gap: '10px',
  },
}))
