import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: '20px 70px',
  },

  cardWrapper: {
    width: '100%',
    background: theme.palette.linearGradient.successDashboardCard,
    boxShadow: theme.palette.boxShadow.paper,
    padding: '20px',
    margin: '10px 0',
    borderRadius: '8px',
    height: 140,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    transition: '0.3s ease',

    '&:hover': {
      background: theme.palette.linearGradient.hoverSuccessDashboardCard,
    },
  },

  cardErrorWrapper: {
    transition: '0.3s ease',
    background: theme.palette.linearGradient.negativeDashboardCard,

    '&:hover': {
      background: theme.palette.linearGradient.hoverNegativeDashboardCard,
    },
  },

  cardSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardHeader: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 20,
  },

  cardTitle: {
    fontSize: '18px',
    lineHeight: '25px',

    fontWeight: 600,
  },

  cardSubTitle: {
    color: theme.palette.text.secondary,
    fontSize: '14px',
    lineHeight: '19px',
  },

  icon: {
    width: 30,
    height: 30,
    color: '#c4c4c4',
  },

  cardValueTitle: {
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '44px',
  },
}))
