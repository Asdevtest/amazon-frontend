import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    color: theme.palette.text.general,
    padding: '5px',
    width: 'max-content',
    border: 'none !important',
    // outline: 'none',
  },
}))
