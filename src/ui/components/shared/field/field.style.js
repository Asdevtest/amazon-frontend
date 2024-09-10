import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    position: 'relative',
    marginBottom: '20px',
    width: '100%',
  },
  rootOneLine: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  label: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,
    marginBottom: '12px',
  },

  labelOneLine: {
    marginBottom: 0,
  },

  errorText: {
    marginTop: '2px',
    color: theme.palette.text.red,
    maxWidth: '100%',
    fontSize: '12px',
    lineHeight: '16px',
    wordBreak: 'break-word',
    position: 'absolute',
  },

  successText: {
    marginTop: '2px',
    color: theme.palette.text.green,
    maxWidth: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '12px',
  },

  errorActive: {
    border: '1px solid red !important',
  },

  tooltipsWrapper: {
    display: 'flex',
    marginLeft: 3,
  },

  tooltip: {
    width: '16px !important',
    height: '16px !important',
    color: 'red',
    transition: '.3s ease-in-out',
    cursor: 'pointer',
  },

  tooltipInfo: {
    marginLeft: '3px',
    color: theme.palette.primary.main,
  },

  labelWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
  },

  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
}))
