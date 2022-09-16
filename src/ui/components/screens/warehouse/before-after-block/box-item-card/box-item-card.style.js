import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingBottom: '20px',
    width: '630px',
    gap: '20px',
  },

  img: {
    width: '128px',
    height: '128px',
    marginRight: '4px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '19px',
    width: '280px',
    maxHeight: '150px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    overflowY: 'auto',
    color: '#001029',
  },
  barCodeField: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
    // width: '280px',
  },

  subTitle: {
    fontSize: '14px',
    color: '#656565',
    lineHeight: '19px',
    // marginRight: theme.spacing(1),
  },
  asin: {
    fontSize: '14px',
    color: '#656565',
    lineHeight: '19px',
  },

  count: {
    fontSize: '14px',
    color: '#001029',
    lineHeight: '19px',
    fontWeight: 600,
  },
  asinTitle: {
    fontSize: '14px',
    color: '#001029',
    lineHeight: '19px',
    fontWeight: 600,
  },
  inputWrapper: {
    border: '1px solid rgba(143, 152, 165, 1)',
    borderRadius: '4px',
    maxWidth: '80px',
    height: '40px',
  },
  input: {
    fontSize: '20px',
    textAlign: 'center',
  },
  countWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '42px',
  },

  countSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
  },
  asinWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
    marginBottom: '7px',
  },
  superCount: {
    marginLeft: '5px',
    fontSize: '22px',
    color: 'rgba(143, 152, 165, 1)',
  },
  chipWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainWrapper: {
    display: 'flex',
    // justifyContent: 'space-between',
    width: '100%',
    // padding: '10px',
    gap: '10px',
  },
  attributeWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  attributeHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  link: {
    maxWidth: '280px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },
  copyImg: {
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  barCodeWrapper: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    marginTop: '10px',
  },
  barCode: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  attributeFooterWrapper: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: '14px',
  },

  attributeFooterWrapperMobile: {
    display: 'none',
  },

  copyValueWrapper: {
    display: 'flex',
    gap: '10px',
  },
  '@media (max-width: 768px)': {
    root: {
      width: '280px',
    },
    img: {
      width: '85px',
      height: '85px',
    },
    attributeHeaderWrapper: {
      flexDirection: 'column',
      gap: '14px',
    },

    attributeFooterWrapper: {
      display: 'none',
    },
    attributeFooterWrapperMobile: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
    },
    title: {
      width: '243px',
    },
    countSubWrapper: {
      gap: '10px',
    },
    label: {
      width: '120px',
    },
  },
})
