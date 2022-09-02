import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  dialogContextClassName: {},
  table: {
    borderCollapse: 'collapse',
    border: 0,
    height: '100px',
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
  tableWrapperInfo: {
    fontSize: '16px',
    textAlign: 'center',
  },
  block: {
    height: '50px',
    backgroundColor: 'f6b2b3a4',
  },
  boxWrapper: {
    width: '100%',
  },

  headerWrapper: {
    backgroundColor: '#F8F8F8',
    height: '65px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 80px',

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
    color: '#001029',
  },

  headerSpanText: {
    fontSize: '18px',
    lineHeight: '140%',
    color: '#0460DE',
    marginLeft: '30px',
  },

  textEllipsis: {
    maxWidth: 150,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  footerWrapper: {
    backgroundColor: '#F8F8F8',
    height: '65px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '80px',

    position: 'sticky',
    bottom: 0,
  },

  footerSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '50px',
  },

  footerTitle: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
  },

  footerSpanText: {
    fontSize: '18px',
    lineHeight: '140%',
    color: '#0460DE',
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
