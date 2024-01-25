import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  cardWrapper: {
    width: '277px',
    background: theme.palette.linearGradient.successDashboardCard,
    boxShadow: `0px 2px 11px 2px ${theme.palette.boxShadow.general}`,
    padding: '20px',
    borderRadius: '8px',
    height: '111px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: '5px',
    transition: '0.3s ease',

    '&:hover': {
      background: theme.palette.linearGradient.hoverSuccessDashboardCard,
    },

    [theme.breakpoints.down(768)]: {
      width: '200px',
      height: '91px',
    },
  },

  iconBtn: {
    width: '16px !important',
    height: '16px !important',
    marginRight: 10,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  icon: {
    width: '29px',
    height: '28px',
    color: '#c4c4c4',
  },

  cardListTitle: {
    fontSize: '18px',
    lineHeight: '27px',
    color: theme.palette.text.general,
    fontWeight: 600,
    marginLeft: '86px',

    [theme.breakpoints.down(768)]: {
      marginLeft: '15px',
    },
  },

  cardSubTitle: {
    width: '127px',
    color: theme.palette.text.second,
  },

  cardValueTitle: {
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '44px',
    color: theme.palette.text.general,
  },

  cardListSubTitle: {
    color: theme.palette.text.second,
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: '10px',
    marginLeft: '86px',

    [theme.breakpoints.down(768)]: {
      marginLeft: '15px',
    },
  },

  cardHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  swiper: {
    height: 170,
    margin: '0 43px',
    padding: '0 45px',

    [theme.breakpoints.down(768)]: {
      minWidth: '300px',
      height: 150,
      margin: '0 5px',
      padding: '0 10px',
      marginBottom: '15px',
    },

    '.swiper-button-prev': {
      color: theme.palette.primary.main,
    },

    '.swiper-button-next': {
      color: theme.palette.primary.main,
    },
  },

  addButton: {
    height: '40px',
    marginLeft: 50,
  },
}))
