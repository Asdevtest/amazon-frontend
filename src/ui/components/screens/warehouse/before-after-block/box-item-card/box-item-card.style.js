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
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  img: {
    width: '128px',
    height: '128px',
    marginRight: '4px',
    objectFit: 'contain',
    objectPosition: 'center',
    [theme.breakpoints.down(768)]: {
      width: '85px',
      height: '85px',
    },
  },

  miss: {
    color: theme.palette.text.second,
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
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },
  barCodeField: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
    // width: '280px',

    color: theme.palette.text.general,
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
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'end',
      gap: '20px',
    },
  },

  countSubWrapper: {
    width: 178,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '25px',
    [theme.breakpoints.down(768)]: {
      gap: '10px',
    },
  },

  attributeFooterSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  asinWrapper: {
    marginTop: 10,
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
    gap: '10px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  attributeWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'end',
      gap: '10px',
    },
  },

  attributeHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'end',
      gap: '14px',
    },
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
    [theme.breakpoints.down(768)]: {
      width: '200px',
    },
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
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  label: {
    fontSize: '14px',
    [theme.breakpoints.down(768)]: {
      width: '120px',
    },
  },

  attributeFooterWrapperMobile: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
    },
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
}))
