import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  upload: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',

    '& .ant-upload-list-item-container, & .ant-upload.ant-upload-select, & .ant-upload-list': {
      width: '100% !important',
      height: '100% !important',
      img: {
        objectFit: 'fill! important ' as 'fill',
      },
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
}))
