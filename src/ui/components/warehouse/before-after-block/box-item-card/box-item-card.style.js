import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginBottom: 30,
    width: '630px',
    gap: '20px',
    [theme.breakpoints.down(1282)]: {
      width: '100%',
    },
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  applyButton: {
    height: 26,
    width: 65,
    marginLeft: 5,
    fontSize: 11,
  },

  img: {
    width: '128px',
    minWidth: '128px',
    maxWidth: '128px',
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
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    color: theme.palette.text.general,

    [theme.breakpoints.down(1282)]: {
      width: '100%',
    },
  },

  barCodeField: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
    color: theme.palette.primary.main,
  },

  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.second,
    lineHeight: '19px',
    whiteSpace: 'nowrap',
  },
  asin: {
    fontSize: '14px',
    color: theme.palette.text.second,
    lineHeight: '19px',
  },

  subValue: {
    fontSize: '16px',

    color: theme.palette.text.general,
    lineHeight: '19px',
    fontWeight: 600,

    maxWidth: 185,
  },

  asinTitle: {
    fontSize: '16px',
    color: theme.palette.text.general,
    lineHeight: '19px',
    fontWeight: 600,
  },

  countWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // gap: '42px',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'end',
      gap: '20px',
    },
  },

  countSubWrapper: {
    width: 150,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '25px',
    [theme.breakpoints.down(1282)]: {
      width: 'fit-content',
      gap: 5,
    },
    [theme.breakpoints.down(768)]: {
      gap: '10px',
    },
  },

  countSuperBoxWrapper: {
    marginLeft: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
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

    [theme.breakpoints.down(1282)]: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      marginTop: 0,
      marginBottom: 0,
    },
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
    [theme.breakpoints.down(1282)]: {
      gap: 20,
    },
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'end',
      gap: '14px',
    },
  },

  barCodeWrapper: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    marginTop: '10px',

    [theme.breakpoints.down(1282)]: {
      width: 150,
      gap: 5,
      marginTop: 0,
    },
    [theme.breakpoints.down(768)]: {
      width: '200px',
    },
  },
  barCode: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',

    [theme.breakpoints.down(1282)]: {
      gap: 5,
    },
  },
  checkboxContainer: {
    width: 'fit-content !important',
    margin: 0,
    padding: 0,
  },
  attributeFooterWrapper: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    gap: '10px',

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

  copyValueMainWrapper: {
    display: 'flex',
    justifyContent: 'start',
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

  warningAccent: {
    outline: '2px solid red',
    borderRadius: 4,
    padding: 5,
  },

  successAccent: {
    outline: '2px solid green',
    borderRadius: 4,
    padding: 5,
  },

  rushOrderWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  rushOrderImg: {
    marginRight: 5,
  },

  priorityWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
}))
