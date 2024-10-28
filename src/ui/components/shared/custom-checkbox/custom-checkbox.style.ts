import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  checkboxContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },

  cell: {
    padding: '10px 0',
  },

  checkbox: {
    span: {
      borderRadius: '4px !important', // delete when completely switching to antd
    },
    '& .ant-checkbox-inner': {
      width: 18,
      height: 18,
    },
  },
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  tooltipIcon: {
    color: theme.palette.primary.main,
    height: '20px',
  },
}))
