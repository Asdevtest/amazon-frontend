import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  chartSubLabel: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    color: theme.palette.text.general,
  },

  chartLabel: {
    fontSize: '16px',
    lineHeight: '22px',
    color: theme.palette.text.general,
  },

  error: {
    color: 'red',
  },

  step: {
    backgroundColor: '#00B746',
    height: '2px',
  },

  dateIndicatorWrapper: {
    border: '1px solid #C4C4C4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '32px',
    padding: '0 5px',
    borderRadius: '4px',
    marginBottom: '10px',
    backgroundColor: theme.palette.background.general,
  },

  indicatorWrapper: {
    border: '1px solid #C4C4C4',

    height: '32px',

    borderRadius: '4px',
    marginBottom: '10px',
  },

  actionDelButton: {
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '22px',
    fontSize: '18px',
    backgroundColor: '#006CFF',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  disabledActionButton: {
    cursor: 'auto',
    opacity: 0.5,
    '&:hover': {
      transform: 'none',
    },
  },

  dateChartWrapper: {
    width: 200,
  },

  chartWrapper: {
    width: 170,
  },

  indicatorPaper: {
    minHeight: 520,
    width: '100%',
  },

  indicatorInput: {
    backgroundColor: theme.palette.background.general,
  },

  subLabelWrapper: {
    display: 'flex',
    margin: '0 0 10px',
    justifyContent: 'space-between',
    alignItems: 'flex-end',

    minHeight: 50,
  },

  chartSharedWrapper: {
    display: 'flex',
    gap: 20,
  },

  chartsMainWrapper: {
    display: 'flex',
    maxHeight: 640,
    // width: 'min-content',
    minWidth: 1050,
    overflow: 'auto',
  },

  chartContainer: {
    width: 'min-content',
  },

  divider: {
    margin: '0 20px',
  },

  totalsSubMainWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  totalsSubWrapper: {
    display: 'flex',
    flexDirection: 'column',

    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 14,
    whiteSpace: 'nowrap',

    color: theme.palette.text.second,
  },

  totalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: 'min-content',
  },

  totalText: {
    fontWeight: 600,
    fontSize: 18,

    color: theme.palette.text.general,
  },

  profitWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  totalsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    marginTop: 20,
  },

  totalsContainer: {
    height: '600px',
    minWidth: 400,
    // width: 700,
  },

  btnsWrapper: {
    marginTop: 220,
  },

  green: {
    color: 'green',
  },

  red: {
    color: 'red',
  },

  mainWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  actionButton: {
    marginLeft: 8,
    width: '30px',
    height: '22px',
    fontSize: '18px',
    color: '#00B746',
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  chartIcon: {
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  totalsPercentsWrapper: {
    marginTop: 40,
  },

  totalsPercentsContainer: {
    display: 'flex',

    width: 240,

    justifyContent: 'space-between',
  },

  percentWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}))
