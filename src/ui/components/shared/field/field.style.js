import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    marginBottom: '20px',
    width: '100%',

    [theme.breakpoints.down(768)]: {
      marginBottom: 0,
    },
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
    color: 'red',
    maxWidth: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '12px',
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
    border: '1px solid red',
  },

  tooltipsWrapper: {
    display: 'flex',
    marginLeft: 3,
  },

  tooltip: {
    width: '18px !important',
    height: '18px !important',
    color: 'red',
    transition: '.3s ease-in-out',
    '&:hover': {
      cursor: 'default',
      transform: 'scale(1.1)',
    },
  },

  tooltipInfo: {
    marginLeft: '3px',
    color: theme.palette.primary.main,
  },

  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}))
