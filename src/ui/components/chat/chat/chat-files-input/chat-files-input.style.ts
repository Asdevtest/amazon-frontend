import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    width: '100%',
    overflow: 'auto',
    height: '100%',
    padding: '5px 20px',
  },
}))
