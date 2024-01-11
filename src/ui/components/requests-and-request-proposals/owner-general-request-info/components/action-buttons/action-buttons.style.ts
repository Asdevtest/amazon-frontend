import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  btnsBlockWrapper: {
    width: 262,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 20,
  },

  listingButton: {
    width: '100%',
  },

  listingCheckbox: {
    color: theme.palette.primary.main,
  },

  listingText: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  publishBtn: {
    width: '100%',
    height: 40,
  },

  btnsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  btnsRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  deleteBtn: {
    color: '#fff',
    width: 97,
    height: 40,
  },

  editBtn: {
    color: '#fff',
    width: 145,
    height: 40,
  },

  buttonEditRemoveBtnIsShown: {
    marginLeft: '10px',
  },

  recoverBtn: {
    width: '100%',
  },

  btnsRowIsLast: {
    marginBottom: 0,
    height: 40,
  },

  buttonWrapperFullWidth: {
    flex: 1,
    display: 'flex',
  },

  button: {
    width: '100%',
  },

  stopBtn: {
    width: '100%',
    background: '#F3AF00',
    color: '#001029',
    '&:hover': {
      opacity: '0.8',
      background: '#F3AF00',
    },
  },
}))
