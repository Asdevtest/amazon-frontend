/* eslint-disable no-unused-vars */
import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
  },

  selectRoot: {},
  select: {
    padding: '0 !important',
  },
  selectIsNotEmpty: {
    padding: '10px 73px 10px 5px !important',
  },

  paymentMethodsLabel: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19pх',

    whiteSpace: 'nowrap',

    color: theme.palette.text.general,
    margin: '0 !important',
  },

  paymentMethodsContainer: {
    display: 'flex',
    gap: 30,
  },

  paymentMethodsField: {
    minWidth: 240,
    minHeight: 40,
    borderRadius: 4,

    border: `1px solid ${theme.palette.primary.main}`,

    '&:before': {
      content: 'none',
    },
  },

  grayBorder: {
    border: `1px solid ${theme.palette.input.customBorder}`,
  },

  paymentMethodsPlaccholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    whiteSpace: 'pre-wrap',

    gap: 30,
  },

  placeholderText: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.primary.main,
  },

  addIcon: {
    width: 13,
    height: 13,

    color: theme.palette.primary.main,
  },

  selectedItemText: {
    textAlign: 'center',

    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.primary.main,
  },

  editIcon: {
    position: 'absolute',
    right: 25,

    width: '13px !important',
    height: '13px !important',

    color: theme.palette.primary.main,
  },
}))
