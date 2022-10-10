import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    minWidth: '500px',
  },

  button: {width: '121px', height: '40px'},
  closeButton: {
    color: '#001029',
  },
  multiline: {
    width: '100%',
    minHeight: '100px',
  },

  descriptionField: {
    height: '100px',
    width: '100%',
    overflowY: 'hidden',
  },

  allowUrlsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  urlInputWrapper: {
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
  },

  httpMethodSelect: {
    height: '65px',
    width: '95px',
  },

  urlInput: {
    overflowY: 'auto',
    whiteSpace: 'wrap',
    height: '65px',
    marginRight: '20px',
    width: '450px',
  },

  form: {
    marginTop: '20px',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },
  '@media (max-width: 768px)': {
    root: {
      minWidth: 0,
      width: '280px',
    },
    fieldLabel: {
      fontSize: '14px',
      lineHeight: '19px',
      color: '#656565',
    },
    btnsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    modalTitle: {
      fontSize: '16px',
      lineHeight: '22px',
      color: '#001029',
      fontWeight: 600,
    },
  },
}))
