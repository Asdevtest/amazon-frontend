import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  orderContainer: {
    padding: '16px 32px',
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
  title: {
    marginBottom: '8px',
  },

  orderWrapperInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  orderSubWrapperInfo: {
    display: 'flex',
    marginRight: '32px',
  },
  dividerTypo: {
    marginRight: '4px',
  },
  orderSubWrapperInfoDivider: {
    marginRight: '32px',
  },
  typoFlexWrapper: {
    display: 'flex',
  },
  mainWrapper: {
    flexGrow: 4,
    minWidth: '330px',
  },

  subTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '20px',
    marginBottom: '12px',
  },

  imgBox: {
    width: '400px',
    height: '400px',
    objectFit: 'center',
    transition: '.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
}))
