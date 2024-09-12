import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    padding: 15,
    display: 'flex',
    gap: '15px',
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
    cursor: 'pointer',
    borderRadius: 16,
  },

  cardWrapper: {
    flexDirection: 'column',
  },

  serviceWrapper: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  image: {
    borderRadius: '16px',
    overflow: 'hidden',
  },

  serviceInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  serviceType: {
    display: 'flex',
    justifyContent: 'center',
    width: 'fit-content',
    fontSize: '14px',
    lineHeight: '19px',
  },

  descriptionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },

  cardTitle: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  cardDescription: {
    fontSize: '14px',
    lineHeight: '19px',
  },

  actionButton: {
    alignSelf: 'flex-end',
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
}))
