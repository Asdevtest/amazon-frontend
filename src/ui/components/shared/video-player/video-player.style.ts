import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  videoPlayer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    video: {
      maxHeight: '400px !important',
    },
  },
}))
