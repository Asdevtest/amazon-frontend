import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  orderContainer: {
    padding: '15px 15px',
    width: '500px',
  },
  amazonTitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: '#001029',
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
    height: '98px',
    width: '92px',
    margin: '0 50px 0 0',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  parameterTableCell: {
    borderBottom: 'none',
    padding: '12px 16px',
  },
  containerTitle: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: '#006CFF',
  },
  label: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '20px',
    color: 'rgba(143, 152, 165, 1)',
  },
  text: {
    color: '#656565',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
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
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: '10px 15px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    textTransform: 'none',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '34px 0 30px',
  },

  asinTypo: {
    color: '#89919C',
  },
  divider: {
    margin: '10px 0',
  },
  lastDivider: {
    margin: '16px 0',
  },
  collapsedWrapper: {
    textAlign: 'center',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    marginTop: '79px',
  },
  copyImg: {
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.07)',
    },
  },
  copyValueWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '19px',
  },
}))
