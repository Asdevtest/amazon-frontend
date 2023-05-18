import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  cardsWrapper: {},
  cardWrapper: {
    width: '277px',

    background: theme.palette.linearGradient.successDashboardCard,

    boxShadow: `0px 2px 11px 2px ${theme.palette.boxShadow.general}`,

    padding: '20px',
    borderRadius: '8px',
    height: '111px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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
    marginLeft: '15px',
    // position: 'absolute',
    // top: '11px',
    // right: '25px',

    width: 15,
    height: 15,
  },

  cardErrorWrapper: {
    // background: 'linear-gradient(157deg,#fff 50%, #FBF2F2 50%);',

    transition: '0.3s ease',

    background: theme.palette.linearGradient.negativeDashboardCard,
    '&:hover': {
      // background: 'linear-gradient(157deg,#fff 50%, #f8dede 50%);',
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
    fontSize: '20px',
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
  },
  addButton: {
    height: '40px',
    marginLeft: 50,
  },
}))
