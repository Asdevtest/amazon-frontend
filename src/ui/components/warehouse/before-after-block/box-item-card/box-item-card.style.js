import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginBottom: 30,

    gap: '20px',
  },

  img: {
    width: '128px',
    minWidth: '128px',
    maxWidth: '128px',
    height: '128px',
    marginRight: '4px',
    objectFit: 'contain',
    objectPosition: 'center',
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
    maxWidth: '250px',
  },

  countSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  countSuperBoxWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
  },

  attributeFooterSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
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
    gap: '10px',
  },

  barCodeWrapper: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  barCode: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  checkboxContainer: {
    justifyContent: 'space-between',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  attributeFooterWrapper: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    gap: '10px',
  },

  label: {
    fontSize: '14px',
  },

  redText: {
    color: theme.palette.text.red,
  },

  attributeFooterWrapperMobile: {
    display: 'none',
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
