import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  table: {
    borderCollapse: 'collapse',
    border: 0,
    height: '110px',
    width: '100%',
  },
  tableWrapper: {
    borderRadius: '4px',
    border: '1px solid #E0E0E0',
    marginBottom: '30px',
  },
  tableAlertWrapper: {
    border: '1px solid red',
  },

  boxWrapper: {
    width: '100%',
  },

  headerWrapper: {
    backgroundColor: theme.palette.background.second,
    height: '65px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 85px 0 65px',
    zIndex: 50,
    position: 'sticky',
    top: 0,
  },

  headerSubWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  headerTitle: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  headerSpanText: {
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.primary.main,
    marginLeft: '30px',
  },

  textEllipsis: {
    maxWidth: 150,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  footerWrapper: {
    backgroundColor: theme.palette.background.second,
    height: '65px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '85px',
    paddingLeft: '65px',
    position: 'sticky',
    bottom: 0,
  },

  footerSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '50px',
    '&: nth-of-type(1)': {
      marginLeft: 0,
    },
  },

  footerTitle: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  footerSpanText: {
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.primary.main,
    marginLeft: '30px',
  },

  footerAlertSpanText: {
    fontSize: '18px',
    lineHeight: '140%',
    color: 'red',
    marginLeft: '30px',
  },

  userLinkWrapper: {
    marginLeft: '30px',
  },
}))
