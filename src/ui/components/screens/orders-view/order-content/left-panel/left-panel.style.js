import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  orderContainer: {
    padding: '15px 15px',
    width: '500px',
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
    margin: '8px 8px 0 8px',
    objectFit: 'contain',
    objectPosition: 'center',
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
  documentsButton: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '0 8px',
    cursor: 'pointer',
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    textTransform: 'none',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 0 10px',
  },

  asinTypo: {
    color: '#89919C',
  },
  divider: {
    margin: '16px 0',
  },
  lastDivider: {
    margin: '16px 0',
  },
  collapsedWrapper: {
    textAlign: 'center',
    cursor: 'pointer',
  },
}))
