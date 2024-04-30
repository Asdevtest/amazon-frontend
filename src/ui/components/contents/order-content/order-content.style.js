import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    background: theme.palette.background.general,
    borderRadius: 20,
  },

  orderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 100,
  },

  containerTitle: {
    fontSize: 18,
    lineHeight: '25px',
  },

  infosWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 100,
  },

  orderTitle: {},

  orderText: {
    fontWeight: 600,
  },

  field: {
    marginBottom: '0 !important',
  },

  orderItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  panelsWrapper: {
    display: 'flex',
    justifyContent: 'space-beetwen',
    gap: 30,
  },

  divider: {
    height: 720,
  },

  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  btnsSubWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 40,
  },

  label: {
    fontSize: 16,
    lineHeight: '19px',
  },
}))
