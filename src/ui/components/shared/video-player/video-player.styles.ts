import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  video: {
    width: '100%',
  },
}))
