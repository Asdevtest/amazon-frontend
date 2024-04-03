import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  infosWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15,
  },

  infosWrapperNoClient: {
    justifyContent: 'flex-start',
  },

  dimensionsAndPhotosWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },

  photos: {
    width: 260,
    display: 'flex',
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

  field: {
    width: '130px !important',
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
    gap: 10,
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
    width: 'max-content',
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
