import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,

    // medium size
    '.ant-switch-checked': {
      '.ant-switch-handle': {
        insetInlineStart: 'calc(100% - 30px)',
      },
    },
  },

  cell: {
    padding: '5px 0',
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  switch: {
    width: 'max-content',
  },

  label: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },

  // medium size
  medium: {
    width: '64px',
    height: '32px',

    '.ant-switch-handle': {
      width: '28px',
      height: '28px',

      '&::before': {
        borderRadius: '18px',
      },
    },
  },
}))
