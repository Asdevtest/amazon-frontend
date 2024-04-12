import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: '100px',
    padding: '10px 10px 10px 15px',
  },

  input: {
    flex: 1,
  },

  crossIcon: {
    height: '10px !important',
    width: '10px !important',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: '5px',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}))
