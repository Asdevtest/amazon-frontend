import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  label: {
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: '600',
    color: theme.palette.text.general,
  },
  input: {
    width: '100%',
  },

  iconButton: {
    height: '40px',
    width: '40px',
    color: 'white',
    backgroundColor: 'rgba(0, 123, 255, 1)',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 1)',
    },
  },
  title: {
    fontSize: '24px',
    lineHeight: '20px',
    color: theme.palette.text.general,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '24px',
  },
  table: {
    border: '1px solid rgb(224, 224, 224)',
    '& td': {
      flexShrink: 0,
      color: theme.palette.text.general,
      borderBottom: 'none',
    },
    '& th': {
      color: theme.palette.text.general,
      fontWeight: 700,
      lineHeight: '15px',
      fontSize: '15px',
      padding: '8px',
    },
    '& tbody': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
  },
  alert: {
    marginBottom: '24px',
  },
  mainCardWrapper: {
    padding: '16px',
    marginBottom: '24px',
    backgroundColor: theme.palette.background.general,
  },
  parseButtonsWrapper: {
    minWidth: 250,
    display: 'flex',
    flexDirection: 'column',
    marginRight: 30,
  },

  carouselWrapper: {
    padding: '16px',
    marginBottom: '16px',
    height: '350px',
  },

  carouselImage: {
    height: '300px',
    objectFit: 'contain',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  imageFileInputWrapper: {
    width: '100%',
  },

  actionsWrapper: {
    width: '100%',
    display: 'flex',
    marginBottom: '16px',
  },

  supplierTitle: {
    marginBottom: '5px',
    color: theme.palette.text.general,
  },

  supplierActionsWrapper: {
    display: 'flex',
  },

  supplierContainer: {
    marginBottom: '20px',
    display: 'flex',
    gap: '16px',
  },

  supplierButtonWrapper: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },

  iconBtn: {
    maxHeight: '40px',
    maxWidth: '40px',
    color: 'white',
    // backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },

  iconBtnRemove: {
    backgroundColor: 'rgba(224, 32, 32, 1)',
  },
  iconBtnAccept: {
    backgroundColor: 'rgba(30, 220, 30, 1) !important',
  },
  iconBtnAcceptRevoke: {
    backgroundColor: 'rgba(224, 32, 32, 1)',
  },

  supplierButtonText: {
    maxWidth: '98px',
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: '400',
    color: theme.palette.text.second,
  },

  imagesModalBtn: {
    width: 40,
    height: 40,
  },

  activeMainIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    background: 'rgb(53, 112, 155)',
    color: '#F5CF00',
  },

  pasteInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: '10px',
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },

  mainCard: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
  },

  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  topPartCardWrapper: {
    width: '100%',
    display: 'flex',
    gap: 30,
  },
}))
