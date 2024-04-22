import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  emptySelectValue: {
    color: theme.palette.text.gray,
  },

  line: {
    display: 'none',
  },

  showLine: {
    display: 'block',
    width: '100%',
    height: 1,
    background: theme.palette.input.customBorder,
  },

  fieldLabel: {
    marginBottom: 5,
    fontSize: 14,
    lineHeight: '19px',
  },

  field: {
    height: '100%',
  },

  fieldContainer: {
    margin: 0,
  },

  editor: {
    maxHeight: 154,
  },
}))
