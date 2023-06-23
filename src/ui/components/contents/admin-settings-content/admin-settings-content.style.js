import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  rootTabs: {
    minHeight: 0,
    marginBottom: 20,
  },

  indicator: {
    height: 1,
  },

  flexContainerTabs: {
    gap: 25,
  },

  rootTab: {
    minHeight: 0,
    padding: '0 15px 9px',
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.4,
    textTransform: 'none',
    color: theme.palette.text.second,
  },

  lol: {
    color: 'white',
  },

  contentWrapper: {
    padding: 40,
    borderRadius: 4,
    backgroundColor: theme.palette.background.general,
    boxShadow: '0 2px 10px 2px rgba(190, 190, 190, 0.15)',
  },

  tabItemButton: {
    height: '50px',
    color: theme.palette.text.second,
    backgroundColor: 'inherit',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    borderRadius: 0,
    marginBottom: '60px',
    width: '100%',
    '&:hover': {
      background: 'linear-gradient(0deg, rgba(0, 108, 255, 0.2) 0%, rgba(0, 108, 255, 0) 100%)',
    },
  },

  tabItemActiveButton: {
    height: '50px',
    color: theme.palette.primary.main,
    backgroundColor: 'inherit',
    borderBottom: '1px solid #006CFF',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    borderRadius: 0,
    marginBottom: '60px',
    width: '100%',
    '&:hover': {
      background: 'linear-gradient(0deg, rgba(0, 108, 255, 0.2) 0%, rgba(0, 108, 255, 0) 100%)',
    },
  },

  tabItemNoActiveContent: {
    padding: '0 20px',
    filter: 'blur(2px)',
    opacity: '0.3',
  },

  tabItemActiveContent: {
    padding: '0',
    height: '74vh',
  },

  placeAddBtnWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },

  tabsWrapper: {
    display: 'flex',
    gap: 25,
  },

  tabsItemWrapper: {
    display: 'flex',
  },

  tabHideDestinationWrapper: {
    width: '25%',
    visibility: 'hidden',
  },

  tabActiveDestinationWrapper: {
    width: '100%',
    visibility: 'visibility',
  },

  hideBlock: {
    display: 'none',
  },
  datagridWrapper: {
    marginTop: '10px',
    height: '74vh',
  },

  footerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTop: 'none !important',
  },
  footerCell: {
    padding: 0,
    margin: 0,
  },
  toolbarContainer: {
    height: '52px',
  },
}))
