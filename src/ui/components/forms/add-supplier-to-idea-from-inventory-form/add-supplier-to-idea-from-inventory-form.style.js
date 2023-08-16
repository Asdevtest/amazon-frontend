import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '750px',
    display: 'flex',
    flexDirection: 'column',
  },

  title: {
    marginBottom: '25px',
    color: theme.palette.text.general,
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
  },

  label: {
    color: theme.palette.text.general,
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
  },

  linksWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  linksSubWrapper: {
    width: '100%',
    maxHeight: '200px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
  },

  linkWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 7,
  },

  linkTextWrapper: {
    width: '80%',
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },

  linkText: {
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },

  input: {
    height: '32px',
    borderRadius: '7px',
    width: 'calc(100% - 181px)',
  },

  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  linksBtnsWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  deleteBtn: {
    width: '20px',
    height: '20px',
  },

  bottomFieldsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  bottomFieldsSubWrapper: {
    width: '47%',
  },

  bigInput: {
    height: 'auto',
  },

  btnsWrapper: {
    alignSelf: 'flex-end',
    width: '47%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  successBtn: {
    width: 140,
    whiteSpace: 'nowrap',
  },

  cancelBtn: {
    marginLeft: 100,
    color: theme.palette.text.general,
  },

  defaultBtn: {
    width: '171px',
  },

  sizesInput: {
    width: '100px',
  },

  sizesContainer: {
    width: 'min-content',
  },

  sizesBottomWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
}))
