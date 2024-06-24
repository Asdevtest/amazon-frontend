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

  lineContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },

  line: {
    width: '100%',
    height: 1,
    background: theme.palette.input.customBorder,
  },

  crossButton: {
    width: 25,
    height: 25,
    padding: 5,
    fontSize: 15,
    lineHeight: '15px',
    color: theme.palette.text.red,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },

    '&:disabled': {
      opacity: 0.5,
      cursor: 'unset',
    },
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
