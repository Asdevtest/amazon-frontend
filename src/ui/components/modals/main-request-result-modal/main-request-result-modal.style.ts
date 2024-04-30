import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 920,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    color: theme.palette.text.primary,
  },

  fieldContainer: {
    margin: 0,
  },

  field: {
    height: '100%',
    padding: 0,
    fontSize: 14,
    lineHeight: '19px',
    borderRadius: 12,
    boxShadow: theme.palette.boxShadow.paper,
  },

  notFocuced: {
    '&.Mui-focused': {
      border: `1px solid ${theme.palette.input.customBorder}`,
    },
  },

  input: {
    padding: 15,
  },
}))
