import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  orderContainer: {
    padding: '15px 15px',
    width: '537px',
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
  radio: {
    height: '20px',
  },
  button: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '0 8px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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

  imagesWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  subTitle: {
    color: '#001029',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19px',
    textAlign: 'center',
  },

  photoCarousel: {
    height: '150px',
    display: 'flex',
    alignItems: 'center',
  },

  subTitleWrapper: {
    marginBottom: '28px',
    width: '100%',
    minHeight: 50,
  },
  photosWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  photoWrapper: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  imgBox: {
    width: '150px',
    height: '150px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  noImgBox: {
    width: '150px',
    height: '150px',
    objectFit: 'contain',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
  },

  orderNumber: {
    marginLeft: '15px',
    fontSize: '22px',
    fontWeight: 'bold',
  },

  input: {
    height: '117px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',

    '& > :disabled': {
      backgroundColor: '#fff',
    },
  },

  commentsWrapper: {
    marginTop: '30px',
  },

  imgBoxWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  commentsTitle: {
    color: '#001029',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19px',
    marginBottom: '20px',
  },

  textField: {
    marginBottom: '40px',
  },
}))
