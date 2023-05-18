import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalWrapper: {
    width: '700px',
  },

  modalTitle: {
    color: theme.palette.text.general,

    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '30px',
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
    gap: 20,
    justifyContent: 'end',
    marginTop: '40px',
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

  link: {
    // width: '660px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  barCodeWrapper: {
    display: 'flex',
    gap: 15,
  },
}))
