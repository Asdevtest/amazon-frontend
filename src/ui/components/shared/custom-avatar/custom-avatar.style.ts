import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  upload: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    '& .ant-upload-list-item-container, & .ant-upload.ant-upload-select, & .ant-upload-list': {
      width: '100% !important',
      height: '100% !important',
    },
    '& .ant-upload-list-item-actions': {
      display: 'flex',
      justifyContent: 'center',
    },
  },

  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: '16px',
    marginTop: '10px',
  },
  changeIcon: {
    color: 'white',
    height: '18px',
    '&:hover': {
      opacity: 0.7,
    },
  },
}))
