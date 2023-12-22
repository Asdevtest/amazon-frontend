import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  noMediaFilesWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  noPhotoIcon: {
    height: '90% !important',
    width: '90% !important',
  },
}))
