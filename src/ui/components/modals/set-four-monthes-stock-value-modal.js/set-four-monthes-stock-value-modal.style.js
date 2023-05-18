import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '425px',
    padding: '0 40px',
  },
  modalTitle: {
    color: theme.palette.text.general,

    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '30px',
    textAlign: 'center',
  },
  modalText: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  count: {
    fontSize: '13px',
    lineHeight: '15px',
    color: 'rgba(189, 194, 209, 1)',
  },
  order: {
    display: 'flex',
    alignItems: 'center',
  },
  orderImg: {
    height: '64px',
    width: '64px',
    marginRight: '12px',
  },
  orderTitle: {
    fontWeight: 500,
  },
  orderText: {
    fontSize: '14px',
  },
  orderChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
  },
  orderChipHover: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  orderChipIcon: {
    color: 'rgba(255,255,255,0.26)',
    '&:hover, &:focus': {
      color: 'rgba(255,255,255,0.46)',
    },
  },
  tooltip: {
    fontSize: '13px',
    margin: '0px',
  },
  divider: {
    margin: '0px -24px',
  },
  boxCode: {
    display: 'flex',
    alignItems: 'center',
    margin: '48px 0px',
  },
  typoCode: {
    marginRight: '8px',
  },
  input: {
    width: '400px',
  },
  saveBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  saveBtn: {
    width: '123px',
    height: '40px',
  },
  closeBtn: {
    width: '123px',
    height: '40px',
    color: theme.palette.text.general,
  },

  standartText: {
    color: theme.palette.text.general,
  },
  error: {
    color: 'red',
  },
  errorWrapper: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '-20px',
  },
}))
