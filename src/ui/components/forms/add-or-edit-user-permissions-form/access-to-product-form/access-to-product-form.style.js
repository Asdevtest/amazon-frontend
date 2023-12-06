import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  accordion: {
    boxShadow: 'none',
    background: theme.palette.background.second,
    marginBottom: 2,

    '&::before': {
      display: 'none',
    },
  },
  accordionSummary: {
    height: '64px',
    width: '650px',
  },
  accordionExpanded: {
    background: theme.palette.background.second,
  },
  selectedValue: {
    marginLeft: '5px',
    color: theme.palette.text.second,
  },
  standartText: {
    color: theme.palette.text.general,
  },
  detailsShopWrapper: {
    width: '100%',
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px 0',
  },

  searchInput: {
    width: '290px',
    height: '40px',
  },
  tableWrapper: {
    marginTop: '10px',
    height: '400px',
  },

  accardionTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },

  chosenText: {
    color: theme.palette.primary.main,
    marginLeft: 'auto',
  },

  chosenTextSelectAll: {
    color: theme.palette.text.green,
  },

  title: {
    maxWidth: '200px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    color: theme.palette.text.general,
  },
}))
