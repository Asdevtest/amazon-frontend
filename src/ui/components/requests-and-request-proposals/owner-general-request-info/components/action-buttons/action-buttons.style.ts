import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  btnsBlockWrapper: {
    width: 262,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 20,
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

  btnsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  btnsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  btnsRowIsLast: {
    marginBottom: 0,
    height: 40,
  },

  stopBtn: {
    width: '100%',
    background: '#F3AF00',
    color: '#001029',

    '&:hover': {
      opacity: '0.8',
      color: '#001029',
      background: '#F3AF00',
    },
  },
}))
