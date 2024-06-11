import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapperToolbar: {
    width: '100%',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  toolbar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  fullWidth: {
    width: '100%',
    justifyContent: 'space-between',
  },

  flexEnd: {
    justifyContent: 'flex-end',
  },

  text: {
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: 600,
  },

  exportButton: {
    padding: '0 15px',
    height: '30px',
    borderRadius: '100px',
    boxShadow: theme.palette.button.defaultBoxShadow,
    border: `1px solid ${theme.palette.input.customBorder}`,
  },
}))
