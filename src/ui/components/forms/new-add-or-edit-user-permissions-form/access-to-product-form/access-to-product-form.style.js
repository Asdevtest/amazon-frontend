import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  accordion: {
    boxShadow: 'none',

    '&::before': {
      display: 'none',
    },
  },
  accordionSummary: {
    height: '64px',
  },
  accordionExpanded: {
    background: '#F4F4F4',
  },
  selectedValue: {
    marginLeft: '5px',
    color: '#656565',
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
}))
