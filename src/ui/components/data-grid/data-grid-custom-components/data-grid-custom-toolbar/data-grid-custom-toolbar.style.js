import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: 30,
  },

  text: {
    fontSize: 16,
    fontWeight: 600,
  },
}))
