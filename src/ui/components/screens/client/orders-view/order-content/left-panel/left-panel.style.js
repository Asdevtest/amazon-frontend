import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  orderContainer: {
    padding: '16px 32px',
    minWidth: '400px',
    flexGrow: 4,
    maxWidth: '100%',
    flexBasis: '40%',
  },
  orderBorderRightMdUp: {
    [theme.breakpoints.up('md')]: {
      borderRight: '1px solid #eee',
    },
  },
  orderPrice: {
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    color: 'rgba(61, 81, 112, 1)',
    whiteSpace: 'nowrap',
  },
  product: {
    display: 'flex',
  },
  productImg: {
    height: '72px',
    width: '72px',
    marginRight: '8px',
    backgroundColor: '#ecb',
  },
  parameterTableCell: {
    borderBottom: 'none',
    padding: '12px 16px',
  },
  containerTitle: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '18px',
    color: 'rgba(61, 81, 112, 1)',
  },
  label: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '20px',
    color: 'rgba(143, 152, 165, 1)',
  },
  text: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  input: {
    fontSize: '13px',
    height: '29px',
    marginTop: '24px',
  },
  radio: {
    height: '20px',
  },
  button: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '0 8px',
    cursor: 'pointer',
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    textTransform: 'none',
  },
  csCodeTypo: {
    height: '33%',
  },
  asinTypo: {
    color: '#89919C',
  },
  divider: {
    margin: '16px -32px',
  },
  lastDivider: {
    margin: '16px -32px -16px',
  },
  collapsedWrapper: {
    textAlign: 'center',
    cursor: 'pointer',
  },
}))
