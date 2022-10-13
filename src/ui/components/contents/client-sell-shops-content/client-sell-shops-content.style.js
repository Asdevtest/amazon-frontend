import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    width: '100%',
    boxShadow: 'inset 0 -1px 0 0 #E6ECF0',
  },
  indicator: {
    backgroundColor: '#1da1f2',
  },

  tabPanel: {
    paddingTop: 20,
  },
}))
