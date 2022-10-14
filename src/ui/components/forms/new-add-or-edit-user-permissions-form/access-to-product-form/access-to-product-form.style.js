import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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

  details: {
    height: '53vh',
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

  searchContainer: {
    margin: 0,
  },

  searchInput: {
    width: '290px',
    height: '40px',
  },
  tableWrapper: {
    marginTop: '10px',
    height: '350px',
  },

  accardionTitleWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
  },

  chosenText: {
    color: theme.palette.primary.main,
    marginLeft: 'auto',
  },
  title: {
    maxWidth: '200px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    color: theme.palette.text.general,
  },
}))
