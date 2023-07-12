import { makeStyles } from 'tss-react/mui'

//

export const useClassNames = makeStyles()(theme => ({
  root: {
    marginBottom: '20px',
    width: '100%',
  },
  rootOneLine: {
    display: 'flex',
    alignItems: 'center',
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
  // input: {
  //   border: `1px solid ${theme.palette.input?.customBorder}`,
  // },
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
    width: '17px',
    height: '17px',
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
