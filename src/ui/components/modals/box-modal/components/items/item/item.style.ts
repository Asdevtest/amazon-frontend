import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: '5px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    borderBottom: `1px solid #E0E0E0`,
  },

  extraPadding: {
    padding: '5px 10px',
  },

  removeBorder: {
    borderBottom: `none`,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
  },

  blue: {
    color: theme.palette.primary.main,
  },

  title: {
    width: 'max-content',
    maxWidth: 180,
    fontSize: 14,
    lineHeight: '19px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  titleOrderInfo: {
    maxWidth: 800,
  },

  icon: {
    width: '19px !important',
    height: '19px !important',
    cursor: 'pointer',
  },

  product: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
  },

  photoWrapper: {
    width: 57,
    height: 57,
    borderRadius: 7,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
  },

  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 7,
  },

  info: {
    width: 180,
    display: 'flex',
    flexDirection: 'column',
  },

  field: {
    width: 100,
    margin: 0,
    gap: 10,
  },

  input: {
    height: 30,
    padding: '5px 10px',
    fontSize: 14,
    lineHeight: '19px',
  },

  inputClasses: {
    borderRadius: 7,
    height: 30,
  },

  label: {
    marginBottom: 5,
    fontSize: 14,
    lineHeight: '19px',
  },

  button: {
    height: 30,
    margin: 0,
    whiteSpace: 'nowrap',
  },

  checkboxWrapper: {
    flex: 1,
  },

  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  checkbox: {
    padding: 0,
  },

  orderDetail: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  },
}))
