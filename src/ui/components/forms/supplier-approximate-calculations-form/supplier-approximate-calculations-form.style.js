import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: 850,
  },

  boxesFiltersWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  button: {
    marginBottom: 5,
    marginRight: '10px',
    fontSize: 18,
    padding: '8px 29px',

    color: theme.palette.text.general,
  },

  selectedBoxesBtn: {
    fontWeight: 600,
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%) !important',

    borderBottom: theme.palette.other.tableActiveFilterBtn,

    color: `${theme.palette.primary.main} !important`,
  },

  tableWrapper: {
    height: '35vh',
  },

  clearBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '15px 0 0',
  },

  title: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,
    marginBottom: 20,
  },

  tabsRoot: {
    fontSize: 14,
    fontWeight: 600,
    width: '100%',
  },

  indicator: {
    backgroundColor: '#1da1f2',
  },
}))
