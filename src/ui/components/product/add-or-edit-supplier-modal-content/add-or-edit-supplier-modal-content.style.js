import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },
  modalContainer: {
    width: '700px',
  },
  titleDivider: {
    margin: '32px -24px',
  },
  fieldsDivider: {
    margin: '32px -24px 20px',
  },
  buttonsWrapper: {
    textAlign: 'right',
    marginTop: '16px',
  },
  saveBtn: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: '#fff',
    marginRight: '8px',
  },
  cancelBtn: {
    backgroundColor: '#d5d5d5',
    color: 'rgba(61, 81, 112, 1)',
    textTransform: 'none',
  },
  commentField: {
    height: 'auto',
    width: '280px',
  },
  bottomWrapper: {
    display: 'flex',
  },

  loadTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '20px',
    marginBottom: '12px',
  },
  imagesButton: {
    marginTop: '30px',
  },

  imageFileInputWrapper: {
    width: '400px',
  },
}))
