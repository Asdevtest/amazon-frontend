import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  changeInputCommentCellWrapper: {
    width: '100%',
    height: '100%',
    padding: '10px',
  },

  changeInputCommentRoot: {
    height: 'auto',
    padding: 5,
  },

  changeInputComment: {
    width: '100%',
    height: '100% !important',
    whiteSpace: 'pre-wrap',
    overflow: 'auto',
    fontSize: 14,
    lineHeight: '19px',
    padding: 0,

    '&::placeholder': {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  commentControls: {
    marginLeft: 5,
    marginRight: 0,
  },

  doneIcon: {
    color: theme.palette.text.green,
  },

  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  clearIcon: {
    width: '20px !important',
    height: '20px !important',
    transition: '.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    color: theme.palette.text.second,
  },

  changeInputIcon: {
    color: theme.palette.primary.main,
    transition: '.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}))
