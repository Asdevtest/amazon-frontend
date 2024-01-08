import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '437px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  cancelBtn: {
    marginLeft: '50px',
    color: theme.palette.text.general,
  },

  button: {
    minWidth: 185,
    padding: '0 30px',
  },

  descriptionField: {
    width: 'unset',
    flex: 1,
    height: '40px',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '10px',
  },

  title: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  label: {
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.text.second,
    margin: '0 !important',
  },

  containerField: {
    marginBottom: '0 !important',
  },
}))
