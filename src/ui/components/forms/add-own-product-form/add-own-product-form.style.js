import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 700,
  },

  title: {
    marginBottom: 20,
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  fieldLabel: {
    marginBottom: 5,
    fontSize: '14px',
    lineHeight: '19px',
  },

  checkbox: {
    padding: 5,
  },

  inputWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  skuItemsWrapper: {
    marginBottom: '10px',
    padding: '0 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  skuItemWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  deleteBtnWrapper: {
    width: '25px',
    height: '25px',
  },

  deleteBtn: {
    width: '20px',
    height: '20px',
    opacity: '0.5',
  },

  skuItemTitle: {
    width: '100%',
    fontSize: '18px',
    lineHeight: '25px',

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  btnsWrapper: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
