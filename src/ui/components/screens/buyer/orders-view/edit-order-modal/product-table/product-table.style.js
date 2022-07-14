import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  tableContainer: {
    marginBottom: '40px',
  },
  imgBox: {
    height: '64px',
    width: '64px',
    borderRadius: '3px',
    textAlign: 'center',
    position: 'relative',
    margin: '12px',
    objectFit: 'contain',
    objectPosition: 'center',
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
      border: '1px solid #e0e0e0',
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
    overflowX: 'auto',
  },
  amazonTitle: {
    maxWidth: '350px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  link: {
    width: '250px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
}))
