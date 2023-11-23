import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  box: {
    width: 527,
    backgroundColor: theme.palette.background.second,
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    borderRadius: '4px',
    padding: '20px 17px',
  },
  order: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginBottom: '30px',
    color: theme.palette.text.general,
  },

  img: {
    width: '66px',
    height: '66px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  boxTitle: {
    color: theme.palette.text.second,
  },

  notAvailable: {
    color: theme.palette.text.second,
  },

  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    width: '299px',
  },

  asinWrapper: {
    display: 'flex',
    gap: '10px',
  },
  asinTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },
  asinValue: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },
  orderInput: {
    width: '79px',
  },
  itemSubWrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 231px)',
    columnGap: '25px',
    rowGap: '30px',
  },
  field: {
    margin: '0',
  },
  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  storekeeperDisableBtn: {
    borderRadius: '4px',
    padding: '6px 7px',
    backgroundColor: theme.palette.input.customDisabled,
  },
  fieldInput: {
    height: '40px',
  },
  bottomBlockWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
  incomingBtnWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '27px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
  tablePanelViewText: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 400,
    color: theme.palette.primary.main,
  },

  shippingLabelWrapper: {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  asinTextWrapper: {
    display: 'flex',
    gap: 5,
  },

  labelWrapperStyles: {
    gap: 19,
  },
}))
