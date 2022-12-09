export const styles = theme => ({
  productCell: {
    display: 'flex',
    alignItems: 'center',
    width: '300px',
  },

  productCellTitle: {
    display: '-webkit-box',
    '-webkitLineClamp': 4,
    '-webkitBoxOrient': 'vertical',
    width: '200px',
    height: 90,
    whiteSpace: 'normal',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  img: {
    height: '64px',
    width: '64px',
    marginRight: '8px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  boxLastRow: {
    borderBottom: '1px solid rgba(217, 222, 229, 1)',
  },
  cellValueNumber: {
    width: 60,
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  centerCell: {
    textAlign: 'center',
  },
  subBoxesTableWrapper: {},
  checkboxRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  barCode: {
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(0.99)',
    },
  },
  button: {
    width: '100%',
    display: 'flex',
  },

  textEllipsis: {
    maxWidth: 150,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  asinCell: {
    padding: '12px 0px',
    height: '88px',
    scope: 'row',
    position: 'relative',
    width: 185,
  },
  asinCellContainer: {
    display: 'inline-flex',
    width: '100%',
  },
  csCodeTypoWrapper: {
    width: '100%',
  },
  csCodeTypo: {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    maxWidth: '150px',
    // maxWidth: '100%',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  copyAsin: {
    display: 'flex',
    gap: '2px',
    alignItems: 'center',
  },
  typoCell: {
    fontSize: '14px',
    lineHeight: '21px',
    color: 'rgba(189, 194, 209, 1)',
  },
  normalizeLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    transition: '.3s ease',
    '&:hover': {
      opacity: '.7',
    },
  },
  linkSpan: {
    marginLeft: 10,
    color: theme.palette.primary.main,
  },
  typoSpan: {
    marginLeft: 10,
    color: theme.palette.text.second,
  },
  shortDateCellTypo: {
    textAlign: 'center',
    width: 65,
    whiteSpace: 'pre-line',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
  },
  multilineTextWrapper: {
    width: 70,
    whiteSpace: 'pre-wrap',
  },
  multilineText: {
    maxHeight: '100%',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    color: theme.palette.text.main,
  },
})
