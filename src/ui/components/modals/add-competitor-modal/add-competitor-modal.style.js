import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  fieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },

  linkField: {
    minHeight: '100px',
    width: '100%',
    overflowY: 'hidden',
  },

  commentField: {
    minHeight: '100px',
    width: '100%',
    overflowY: 'hidden',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: '10px',
  },

  modalMessageWrapper: {
    width: '400px',
  },
}))
