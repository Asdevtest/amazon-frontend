import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
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
    gap: 10,
  },

  deadlineWrapper: {
    width: 160,
  },

  fieldLabel: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: theme.palette.text.general,
    marginBottom: 5,
  },

  buyerWrapper: {
    marginTop: '40px',
  },

  intWarehouseWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
}))
