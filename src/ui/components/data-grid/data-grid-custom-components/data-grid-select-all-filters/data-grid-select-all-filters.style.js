import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  body: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    textAlign: 'left',

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
