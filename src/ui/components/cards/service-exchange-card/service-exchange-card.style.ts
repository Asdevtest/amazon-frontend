import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '540px',
    padding: '10px',
    display: 'flex',
    gap: '15px',
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
    cursor: 'pointer',
    borderRadius: 16,
  },

  cardWrapper: {
    flexDirection: 'column',
    width: '260px',
  },

  serviceWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  image: {
    width: 'max-content',
    borderRadius: '16px',
  },

  serviceInfo: {
    display: 'flex',
    alignItems: 'center',
  },

  serviceType: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '12px',
    lineHeight: '16px',
    width: '90px',
  },

  descriptionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    height: '100%',
  },

  actionButton: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  detailsText: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },

  detailTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  detailDescription: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
