import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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
    color: theme.palette.text.general,
  },
  barCodeField: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
    // width: '280px',
  },

  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.second,
    lineHeight: '19px',
    // marginRight: theme.spacing(1),
  },
  asin: {
    fontSize: '14px',
    color: theme.palette.text.second,
    lineHeight: '19px',
  },

  count: {
    fontSize: '14px',
    color: theme.palette.text.general,
    lineHeight: '19px',
    fontWeight: 600,
  },
  asinTitle: {
    fontSize: '14px',
    color: theme.palette.text.general,
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

  editAccent: {
    outline: '2px solid #F5CF00',
    borderRadius: 4,
    padding: 5,
  },

  '@media (max-width: 768px)': {
    root: {
      width: '100%',
    },
    mainWrapper: {
      width: '100%',

      justifyContent: 'space-between',
    },
    img: {
      width: '85px',
      height: '85px',
    },
    attributeWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'end',
      gap: '10px',
    },
    countWrapper: {flexDirection: 'column', alignItems: 'end', gap: '20px'},
    attributeHeaderWrapper: {
      flexDirection: 'column',
      alignItems: 'end',
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
      width: '100%',
    },
    countSubWrapper: {
      gap: '10px',
    },
    label: {
      width: '120px',
    },
    barCodeWrapper: {
      width: '200px',
    },
  },
}))
