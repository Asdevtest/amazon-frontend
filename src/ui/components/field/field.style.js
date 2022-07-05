import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles({
  root: {
    marginBottom: '20px',
    width: '100%',
  },
  rootOneLine: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    // fontSize: '16px',
    // lineHeight: '20px',
    // color: 'rgba(61, 81, 112, 1)',
    // fontWeight: '600',
    // marginBottom: '12px',

    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',
    color: '#001029',
    marginBottom: '12px',
  },

  labelOneLine: {
    marginBottom: 0,
  },
  input: {
    width: '100%',
    height: '32px',
    borderRadius: '4px',
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
  errorActive: {
    border: '1px solid red',
  },
  noFullWidth: {
    width: 'auto',
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
  },

  labelWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
  },
})
