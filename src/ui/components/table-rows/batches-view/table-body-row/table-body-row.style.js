import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  boxLastRow: {
    borderBottom: '1px solid rgba(217, 222, 229, 1)',
  },

  row: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
  },

  selected: {
    backgroundColor: 'rgba(0,123,255,0.3)',
  },
}))
