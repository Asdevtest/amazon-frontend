import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  table: {
    '& td': {
      flexShrink: 0,
      color: 'rgba(61, 81, 112, 1)',
      borderBottom: 'none',
    },
    '& th': {
      color: 'rgba(61, 81, 112, 1)',
      fontWeight: 700,
      lineHeight: '15px',
      fontSize: '15px',
      padding: '8px',
    },
    '& tbody': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
    maxHeight: '197px',
  },

  tableCellPadding: {
    padding: '5px 15px !important',
  },
  centerTableCellPadding: {
    // padding: '16px 24px',
  },
  alignLeft: {
    textAlign: 'left',
  },

  alignLeftHeader: {
    textAlign: 'left',
    fontSize: '14px !important',
    lineHeight: '19px !important',
    color: '#656565 !important',
  },

  nameCell: {
    width: 275,
    padding: '5px 15px',
    fontSize: '14px !important',
    lineHeight: '19px !important',
    color: '#001029 !important',
  },

  indexCell: {
    padding: 0,
    fontSize: '14px !important',
    lineHeight: '19px !important',
    color: '#c4c4c4 !important',
  },
  clearCell: {
    padding: 0,
    color: '#001029 !important',
    cursor: 'pointer',
  },

  row: {
    borderBottom: '1px solid #c4c4c4',
    padding: 0,
    margin: 0,
  },
  icon: {
    width: '20px !important',
  },
}))
