import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  mainWrapper: {
    width: '600px',
    display: 'flex',

    flexDirection: 'column',
  },

  mainTitle: {
    marginBottom: '30px',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: '#001029',
  },

  link: {
    width: '500px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },

  noSettingsWarning: {
    color: 'red',
  },

  cancelButton: {
    marginLeft: '10px',
  },

  btnsWrapper: {
    display: 'flex',
    marginTop: '40px',
    justifyContent: 'flex-end',
    gap: '10px',
  },

  actionBtn: {
    width: '185px',
    height: '40px',
  },

  textField: {
    width: '100%',
    height: '32px',
    color: 'rgba(61, 81, 112, 1)',
    // padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '4px',
    fontWeight: '400',
    lineHeight: '1.5',
  },
}))
