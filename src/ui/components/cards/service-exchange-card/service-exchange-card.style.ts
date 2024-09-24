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
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
  },

  serviceListWrapper: {
    width: 250,
  },

  image: {
    borderRadius: '16px',
  },

  noImage: {
    display: 'flex',
    alignSelf: 'center',
    maxWidth: '250px',
  },

  serviceInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  serviceType: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '14px',
    lineHeight: '19px',
    minWidth: '120px',
    width: '120px',
  },

  descriptionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
    height: '100%',
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
