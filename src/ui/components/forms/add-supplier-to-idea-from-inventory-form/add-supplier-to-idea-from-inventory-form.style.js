import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '750px',
    display: 'flex',
    flexDirection: 'column',
  },

  mainTitle: {
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '33px',
    color: 'black',
  },

  title: {
    marginBottom: '25px',
    color: '#001029',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
  },

  label: {
    color: '#001029',
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

  copyImg: {
    marginRight: 15,
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.07)',
    },
  },

  input: {
    height: '32px',
    borderRadius: '4px',
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
    height: '210px',
  },

  btnsWrapper: {
    alignSelf: 'flex-end',
    width: '47%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  successBtn: {
    width: 136,
  },

  cancelBtn: {
    marginLeft: 100,
  },

  defaultBtn: {
    width: '171px',
  },
}))
