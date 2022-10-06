import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(()=> ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  number: {
    fontWeight: 500,
    marginRight: '6px',
  },
  starWrapper: {
    display: 'flex',
    paddingBottom: '2px',
  },
  star: {
    fontSize: '22px',
    color: '#C8CED3',
  },
  active: {
    color: '#FFC632',
  },
})
