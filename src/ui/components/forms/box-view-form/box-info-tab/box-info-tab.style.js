import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    marginTop: 29,
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,
    borderTop: `1px solid #E0E0E0`,
    borderBottom: `1px solid #E0E0E0`,
  },

  infosWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15,
  },

  dimensionsAndPhotosWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },

  photos: {
    width: 246,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dimensions: {
    width: 234,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  switcherWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  fieldsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  shippingLabelWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  shippingLabel: {
    height: 40,
    width: 145,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  fields: {
    width: 234,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  field: {
    width: '100px !important',
    margin: '0 !important',
  },

  bigField: {
    width: '100% !important',
  },

  input: {
    height: 40,
    borderRadius: 7,
  },

  label: {
    marginBottom: 5,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
  },

  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  userIcon: {
    height: 24,
    width: 24,
    borderRadius: '50%',
  },

  checkbox: {
    padding: 0,
  },

  trackNumberFields: {
    width: '100%',
  },

  trackNumberBtn: {
    width: '100%',
  },

  trackNumberPhoto: {
    width: '100%',
    height: 127,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #E0E0E0',
    borderRadius: 7,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  twoLines: {
    height: 38,
  },

  textSecond: {
    color: theme.palette.text.second,
  },

  textAlert: {
    marginLeft: 5,
    display: 'inline-block',
    color: theme.palette.other.rejected,
  },
}))
