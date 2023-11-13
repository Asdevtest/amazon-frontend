import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: 700,
    padding: 10,
  },

  title: {
    marginBottom: 20,
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  fieldLabel: {
    marginBottom: 5,
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  fieldContainer: {
    marginBottom: 15,
  },

  checkbox: {
    padding: 5,
  },

  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  input: {
    height: '32px',
    borderRadius: '7px',
    width: 'calc(100% - 120px)',
  },

  defaultBtn: {
    height: 32,
    width: 100,
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
