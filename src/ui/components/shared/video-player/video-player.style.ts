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

    // if an external link comes (for example YouTube), then the iframe tag is used inside the ReactPlayer and not the video tag
    div: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      iframe: {
        maxHeight: '400px !important',
      },
    },
  },
}))
