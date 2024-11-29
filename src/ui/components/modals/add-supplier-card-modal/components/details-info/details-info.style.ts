import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    gap: '10px',

    '.detailsArea': {
      flex: 1,
    },
  },
}))
