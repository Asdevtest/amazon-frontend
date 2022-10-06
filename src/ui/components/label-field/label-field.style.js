import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(()=> ({
  root: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    lineHeight: '20px',
    color: 'rgba(61, 81, 112, 1)',
    fontWeight: '600',
    marginBottom: '12px',
  },
  field: {
    fontSize: '16px',
    lineHeight: '20px',
    color: 'black',
    fontWeight: '400',
    marginBottom: '12px',
  },
})
