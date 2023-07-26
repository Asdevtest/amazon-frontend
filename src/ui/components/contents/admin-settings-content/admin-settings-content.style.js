import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // gap: '10px',
  },

  tabItemWrapper: {
    width: '25%',
  },

  tabItemButton: {
    height: '50px',
    color: theme.palette.text.second,
    backgroundColor: 'inherit',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    borderRadius: 0,
    marginBottom: '10px',
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
    marginBottom: '10px',
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
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    width: '100%',
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
    height: '68vh',
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: theme.palette.background.general,

    backgroundColor: theme.palette.background.general,
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
