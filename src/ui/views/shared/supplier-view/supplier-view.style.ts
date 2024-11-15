import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  content: {
    position: 'relative',
    height: '100%',
    padding: '5px',
    display: 'grid',
    gridAutoRows: 'min-content',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '10px',
    overflowY: 'auto',
  },

  filterButton: {
    position: 'absolute',
    top: '20px',
    right: '0px',
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
}))
