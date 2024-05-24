import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: 10,
    width: 945,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  flexRowContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 20,
  },

  alignCenter: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tableContainer: {
    width: '100%',
    height: 400,
  },

  dataGridRoot: {
    borderRadius: '6px !important',
  },

  fieldContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  inputContainer: {
    width: '20%',
  },

  textareaContainer: {
    width: '80%',
  },

  label: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },

  checkbox: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.secondary,
  },
}))
