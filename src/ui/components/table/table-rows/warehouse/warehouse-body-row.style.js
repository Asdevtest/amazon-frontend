export const styles = theme => ({
  img: {
    height: '64px',
    width: '64px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  boxLastRow: {
    borderBottom: '1px solid rgba(217, 222, 229, 1)',
  },
  cellValueNumber: {
    // width: 60,
    // textAlign: 'left',
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
  },
  centerCell: {
    textAlign: 'center',
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
    marginLeft: 10,
  },
  csCodeTypo: {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    maxWidth: '150px',
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
    marginLeft: 5,
    color: theme.palette.primary.main,
  },
  typoSpan: {
    marginLeft: 10,
    color: theme.palette.text.second,
  },
  shortDateCellTypo: {
    textAlign: 'center',
    width: 60,
    whiteSpace: 'pre-line',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
  },
  multilineTextWrapper: {
    width: 80,
    whiteSpace: 'pre-wrap',
  },
  multilineText: {
    maxHeight: '100%',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    color: theme.palette.text.main,
  },
  amountCell: {
    width: 80,
    whiteSpace: 'pre-wrap',
  },
})
