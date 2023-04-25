import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    color: theme.palette.text.general,
    padding: '5px',
    width: '100%',
    border: 'none !important',
    // outline: 'none',
  },

  datePickerRoot: {
    border: '1px solid #E0E0E0',
  },
}))
