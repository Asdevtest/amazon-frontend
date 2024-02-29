import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  shopsReportBtnsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    width: '100%',
  },

  downloadLinkButton: {
    padding: '0',
  },

  downloadLink: {
    color: 'currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',

    width: '100%',
    height: '100%',
  },

  copyImgButton: {
    padding: 5,
  },
}))
