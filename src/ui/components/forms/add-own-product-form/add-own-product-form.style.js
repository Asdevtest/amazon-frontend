import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '700px',
  },

  btnsWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  input: {
    height: '32px',
    borderRadius: '7px',
    width: 'calc(100% - 110px)',
  },

  defaultBtn: {
    marginLeft: '10px',
    height: '32px',
    width: '100px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: theme.palette.text.general,

    marginBottom: '30px',
  },

  skuItemsWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '0 10px',
  },

  skuItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
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
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '20px',
  },

  checkboxWrapper: {
    width: '145px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      opacity: '0.8',
    },
  },
  fieldLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },
}))
