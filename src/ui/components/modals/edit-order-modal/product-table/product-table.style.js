/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tableContainer: {
    marginBottom: '40px',
  },
  imgBox: {
    height: '64px',
    width: '64px',
    borderRadius: '3px',
    textAlign: 'center',
    position: 'relative',
    margin: '12px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  table: {
    '& td': {
      flexShrink: 0,
      borderBottom: 'none',
      whiteSpace: 'nowrap',
    },
    '& th': {
      fontWeight: 700,
      lineHeight: '15px',
      fontSize: '15px',
      padding: '8px',
    },
    '& tbody': {
      border: '1px solid #e0e0e0',
    },
  },

  tableCell: {
    textAlign: 'center',
  },

  amazonTitle: {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    height: '1.1em',
    whiteSpace: 'normal',

    overflow: 'hidden',
    textOverflow: 'ellipsis',

    width: '190px',
    marginBottom: 10,
  },

  link: {
    width: '250px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  commentInput: {
    fontSize: '14px',
    width: '100%',
    height: 40,
    padding: 0,
  },
  fieldWrapper: {
    paddingTop: 20,
    width: 100,
    height: '100%',
    display: 'flex',
  },

  asin: {
    color: '#4CA1DE',
  },
}))
