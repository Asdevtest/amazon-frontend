import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
  },

  button: {
    borderRadius: '16px', // delete when completely switching to antd

    span: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },

  dropdown: {
    '& > ul': {
      padding: '0 !important',
      borderRadius: '8px !important',

      li: {
        padding: '8px !important',

        span: {
          height: '16px !important',
        },
      },
    },
  },

  dropdownButton: {
    width: '100%',

    'button:nth-of-type(1)': {
      width: '100%',
    },
    '.ant-btn': {
      display: 'flex',
      gap: '5px',
      borderRadius: '16px', // delete when completely switching to antd

      span: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  },

  iconButton: {
    span: {
      display: 'flex',
      alignItems: 'center',
    },
  },

  left: {
    justifyContent: 'flex-start',
  },

  right: {
    justifyContent: 'flex-end',
  },

  center: {
    justifyContent: 'center',
  },
}))
