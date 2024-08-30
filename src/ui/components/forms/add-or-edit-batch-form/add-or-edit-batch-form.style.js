import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '1360px',
  },

  modalTitle: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
  },

  boxCounterWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  boxCounterText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  boxCounterCount: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    color: theme.palette.text.second,
  },

  tableWrapper: {
    marginTop: '10px',
    display: 'flex',
    height: 450,
    width: '100%',
  },

  btnsWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },

  filtersWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    width: '100%',
  },

  filterField: {
    width: 200,
  },

  sumField: {
    width: '230px',
    margin: 0,
  },

  sumsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '720px',
    gap: 10,
  },

  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    margin: '25px 0 30px',
  },

  searchInput: {
    width: '400px',
    height: '32px',
  },

  searchWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tableSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    marginBottom: 24,
  },

  weigthCalcWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  volumeWeightDivider: {
    margin: '0 40px',
    color: theme.palette.text.second,
  },

  subFieldLabel: {
    color: theme.palette.text.second,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '16px',
    whiteSpace: 'pre-wrap',
    marginBottom: '5px !important',
  },
}))
