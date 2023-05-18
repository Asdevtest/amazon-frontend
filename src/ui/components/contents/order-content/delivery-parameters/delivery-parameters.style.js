import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: '15px 15px',
    width: 450,
  },

  parameterTableCell: {
    borderBottom: 'none',
    padding: '12px 16px',
  },

  checkbox: {
    padding: 0,
    marginRight: 10,
  },

  expressWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    transition: '.3s ease',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.01)',
    },
  },

  disabledExpressWrapper: {
    '&:hover': {
      cursor: 'auto',
      transform: 'none',
    },
  },

  researchWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },

  deliveryImg: {
    marginLeft: 10,
  },

  parameterTableCellWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  deadlineWrapper: {
    width: 160,
  },

  containerTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: theme.palette.text.general,
    lineHeight: '21px',
  },

  text: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '19px',
    maxWidth: '200px',
    textAlign: 'right',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  scrollingText: {
    color: theme.palette.primary.main,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    maxWidth: '150px',
    textAlign: 'right',
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },

  storekeeperWrapper: {
    marginTop: '40px',
  },

  fieldLabel: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: theme.palette.text.general,
    margin: 0,
  },

  buyerWrapper: {
    marginTop: '40px',
  },
  avatar: {
    width: '28px',
    height: '28px',
  },
  intWarehouseWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
}))
