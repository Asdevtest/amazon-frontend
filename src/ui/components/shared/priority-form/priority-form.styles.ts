import { makeStyles } from 'tss-react/mui'

export const usePriorityFormStyles = makeStyles()(theme => ({
  reasonInput: {
    width: '100%',
    maxWidth: 367,
    minWidth: 367,
    minHeight: 75,
  },

  label: {
    marginBottom: 5,
    fontSize: 14,
    color: theme.palette.text.second,
  },
}))
