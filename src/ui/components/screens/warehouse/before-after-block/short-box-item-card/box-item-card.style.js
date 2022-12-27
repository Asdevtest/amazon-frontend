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

  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '19px',
    width: '100%',
    maxHeight: '150px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    overflowY: 'auto',
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
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
    fontSize: '16px',
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

  attributeFooterWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  label: {
    fontSize: '14px',
  },

  attributeFooterMobileWrapper: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
      display: 'block',
    },
  },

  copyValueWrapper: {
    display: 'flex',
    gap: '10px',
  },
}))
