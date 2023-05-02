/* eslint-disable no-unused-vars */
import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: 378,
    minHeight: 368,

    marginRight: 10,
  },

  paymentMethodTitleWrapper: {
    display: 'flex',
    alignItems: 'center',

    marginLeft: -12,
    marginBottom: 20,
  },
  paymentMethodTitle: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.general,
  },
  commentInput: {
    height: 'auto',
  },
  label: {
    margin: '0 !important',
    color: theme.palette.text.second,
  },
  containerClasses: {
    marginBottom: '10px !important',
  },
  imageListWrapperStyles: {
    width: '100%',
  },

  imageFileInputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },

  cardManageWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  notActiceCard: {
    filter: 'blur(2px)',
    opacity: '0.3',
    pointerEvents: 'none',
  },
}))
