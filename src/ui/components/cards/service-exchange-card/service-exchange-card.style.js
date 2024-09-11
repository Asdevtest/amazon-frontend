import { makeStyles } from 'tss-react/mui'

import { display } from '@mui/system'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    padding: 15,
    display: 'flex',
    gap: '15px',
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
    borderRadius: 16,
  },

  cardWrapper: {
    flexDirection: 'column',
  },

  serviceWrapper: {
    width: 250,
  },

  image: {
    borderRadius: 16,
    overflow: 'hidden',
  },

  serviceInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
  },

  serviceType: {
    display: 'flex',
    justifyContent: 'center',
    width: 'fit-content',
    fontSize: '14px',
  },

  descriptionWrapper: {
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },

  cardTitle: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    color: theme.palette.text.general,
  },

  cardDescription: {
    height: 57,
    fontSize: '14px',
    lineHeight: '19px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },

  actionButton: {
    display: 'flex',
    width: 'fit-content',
    alignSelf: 'end',
  },

  detailsSubWrapper: {
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
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  detailsWrapperAll: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
}))
