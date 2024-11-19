import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  filterButton: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    width: '40px',
    overflow: 'hidden',
    transition: 'width 0.3s ease',
    gap: 0,

    '& span:not(.ant-btn-icon)': {
      visibility: 'hidden',
      opacity: 0,
      whiteSpace: 'nowrap',
      transition: 'opacity 0.3s ease, visibility 0.3s ease',
    },

    '&:hover': {
      width: '125px',
      gap: 8,

      '& span:not(.ant-btn-icon)': {
        visibility: 'visible',
        opacity: 1,
      },
    },
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    '.ant-form-item': {
      margin: 0,
    },
  },

  space: {
    alignItems: 'flex-end',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  treeSelectPopup: {
    '.ant-select-tree-title, .ant-select-selection-item': {
      wordBreak: 'break-word',

      span: {
        display: 'none',
      },
    },
  },

  treeSelect: {
    '.ant-select-selection-item-content': {
      wordBreak: 'break-word',

      span: {
        display: 'none',
      },
    },
  },

  treeSelectWrapper: {
    width: '100%',
  },
}))
