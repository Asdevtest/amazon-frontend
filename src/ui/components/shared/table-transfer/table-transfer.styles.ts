// table-transfer.styles.ts
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  transferWrapper: {
    height: '100%',
    '& .ant-transfer': {
      height: '100% !important',
    },

    '& .ant-transfer-list-body-customize-wrapper': {
      height: '100% !important',
    },
    '& .ant-checkbox-inner': {
      borderRadius: '4px !important',
    },

    '& .ant-table-wrapper': {
      height: '100% !important',

      '& .ant-spin-nested-loading': {
        height: '100% !important',

        '& .ant-spin-container': {
          height: '100% !important',
          display: 'flex !important',
          flexFlow: 'column nowrap !important',

          '& .ant-table': {
            flex: 'auto !important',
            overflow: 'hidden !important',

            '& .ant-table-container': {
              height: '100% !important',
              display: 'flex !important',
              flexFlow: 'column nowrap !important',

              '& .ant-table-header': {
                flex: 'none !important',
              },

              '& .ant-table-body': {
                flex: 'auto !important',
                overflow: 'auto !important',
              },
            },
          },

          '& .ant-table-pagination': {
            flex: 'none !important',
          },
        },
      },
    },
  },
}))
