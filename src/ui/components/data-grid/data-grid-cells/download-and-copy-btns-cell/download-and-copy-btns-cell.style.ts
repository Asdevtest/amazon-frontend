import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  shopsReportBtnsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    width: '100%',
  },

  downloadLink: {
    color: 'currentColor',
  },

  copyImgButton: {
    padding: 5,
  },
}))
