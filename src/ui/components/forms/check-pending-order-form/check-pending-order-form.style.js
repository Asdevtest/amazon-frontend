/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: 485,
    height: 'auto',
    maxHeight: 900,
    overflowY: 'auto',
  },
  productsWrapper: {
    width: '100%',
    height: 'auto',
  },
  warningWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 10,
  },
  warning: {
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '26px',

    color: theme.palette.general,
  },
  text: {
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '140%',

    color: theme.palette.text.general,
  },
  orderInfo: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
  asinsAndOrderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    marginBottom: 25,
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 20,
  },
  asinsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',

    gap: 3,
  },
  CancelBtn: {
    color: theme.palette.text.general,
  },
}))
