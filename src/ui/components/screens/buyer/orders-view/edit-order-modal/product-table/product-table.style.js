import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  imgBox: {
    backgroundColor: 'rgba(196, 196, 196, 1)',
    height: '64px',
    width: '64px',
    borderRadius: '3px',
    textAlign: 'center',
    position: 'relative',
    margin: '12px',
  },

  table: {
    '& td': {
      flexShrink: 0,
      color: 'rgba(61, 81, 112, 1)',
      borderBottom: 'none',
      whiteSpace: 'nowrap',
    },
    '& th': {
      color: 'rgba(61, 81, 112, 1)',
      fontWeight: 700,
      lineHeight: '15px',
      fontSize: '15px',
      padding: '8px',
    },
    '& tbody': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
  },
  orderChip: {
    backgroundColor: 'rgb(0, 123, 255)',
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
  },
  orderChipHover: {
    '&:hover, &:focus': {
      backgroundColor: 'rgb(0, 123, 255)',
    },
  },
  orderChipIcon: {
    color: 'rgba(255,255,255,0.26)',
    '&:hover, &:focus': {
      color: 'rgba(255,255,255,0.46)',
    },
  },
  tableCell: {
    textAlign: 'center',
  },
  input: {
    width: '80px',
  },
  selected: {
    color: 'white',
    backgroundColor: 'rgba(0, 123, 255, 1)',
    '&:hover, &:focus': {
      backgroundColor: '#1269ec',
    },
  },
  checkboxWithLabelWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suplierLinkCell: {
    maxWidth: '400px',
    overflowX: 'scroll',
  },
}))
