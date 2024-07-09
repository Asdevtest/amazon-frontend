import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  shopsReportBtnsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  downloadLink: {
    color: 'currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10px',

    width: '100%',
    height: '100%',
  },

  copyImgButton: {
    padding: 5,
  },
}))
