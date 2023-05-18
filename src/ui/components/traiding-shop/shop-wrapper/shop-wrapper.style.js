import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  chartsWrapper: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
}))
