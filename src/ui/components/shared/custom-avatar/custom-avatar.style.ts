import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  upload: {
    width: 140,
    height: 140,
    '& .ant-upload-list-item-container': {
      width: '140px !important',
      height: '140px !important',
    },
    '& .ant-upload.ant-upload-select': {
      width: '140px !important',
      height: '140px !important',
    },
  },
}))
