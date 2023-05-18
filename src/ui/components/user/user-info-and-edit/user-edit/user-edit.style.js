import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  mainWrapper: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    flexDirection: 'column',
    minHeight: '85vh',
  },
}))
