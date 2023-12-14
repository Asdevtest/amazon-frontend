import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    gap: 10,
  },

  saveButton: {
    width: 240,
  },

  datagridWrapper: {
    height: '70vh',
    width: '100%',
  },
}))
