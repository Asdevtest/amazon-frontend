import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  videoPlayer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
