import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    minWidth: '500px',
  },

  '@media (max-width: 768px)': {
    root: {
      minWidth: '280px',
      paddingTop: '20px',
    },
  },
}))
