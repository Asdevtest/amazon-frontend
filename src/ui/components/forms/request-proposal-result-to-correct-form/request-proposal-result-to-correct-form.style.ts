import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 600,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  title: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
  },

  label: {
    fontSize: '18px',
    lineHeight: '140%',
    marginBottom: 5,
  },

  reasonInput: {
    height: 'auto',
    width: '100%',
  },

  totalTime: {
    marginBottom: 20,
  },

  inputsWrapper: {
    display: 'flex',
    gap: 30,
  },

  inputWrapper: {
    width: '50px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
  },

  btnWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
  },

  input: {
    width: '80px',
    border: 'none',
    padding: 0,
    margin: 0,
    borderRadius: 0,
    borderBottom: '1px solid #e0e0e0',
  },

  inputField: {
    margin: 0,
  },

  inputLabel: {
    color: theme.palette.text.second,
  },
}))
