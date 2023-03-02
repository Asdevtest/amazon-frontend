import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    borderRadius: 20,

    backgroundColor: theme.palette.background.general,
    padding: '15px 20px',
    zIndex: 999,

    // marginBottom: 20,

    display: 'flex',
    // alignItems: 'center',
    // border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: '0px 2px 40px 2px rgba(0, 0, 0, 0.4)',

    // cursor: 'pointer',
    // transition: '.3s ease',
    // '&:hover': {
    //   transform: 'scale(1.01)',
    // },
  },

  itemWrapper: {
    // padding: 5,
    borderRadius: 10,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    // width: 200,
    // cursor: 'pointer',
    // transition: '.3s ease',
    // '&:hover': {
    //   transform: 'scale(0.99)',
    //   backgroundColor: theme.palette.background.second,
    // },
  },

  titleWrapper: {
    display: 'flex',
  },

  attentionTitle: {
    color: '#FF1616',
    fontSize: 14,
    fontWeight: 600,
    marginRight: 5,
  },

  title: {
    color: theme.palette.text.general,
    fontSize: 14,
    fontWeight: 600,
  },

  // messageText2: {
  //   // marginTop: 5,
  //   color: theme.palette.text.general,
  //   whiteSpace: 'pre',
  //   // width: 'max-content',
  //   // display: 'flex',
  //   // flexWrap: 'wrap',
  //   // whiteSpace: 'nowrap',
  // },

  messageText: {
    // marginTop: 5,
    marginLeft: 5,
    color: theme.palette.text.general,
    whiteSpace: 'pre-wrap',
    // width: 'max-content',
    width: 'auto',
    display: 'flex',
    // flexWrap: 'wrap',
    // whiteSpace: 'nowrap',
  },

  asin: {
    fontSize: '14px',
    lineHeight: '21px',
    color: 'rgba(189, 194, 209, 1)',
  },

  asinText: {
    marginLeft: 5,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '.3s ease',
    '&: hover': {
      opacity: '.8',
    },
  },

  filesText: {
    color: theme.palette.text.second,
    marginTop: 10,
  },

  closeIcon: {
    color: '#C4C4C4',
    cursor: 'pointer',
    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  messageDate: {
    fontSize: 12,
    color: theme.palette.text.second,
  },

  avatarWrapper: {
    width: 53,
    height: 53,
    marginRight: 20,
  },

  rightSiteWrapper: {
    marginLeft: 20,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  centerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  centerSubWrapper: {
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: 600,
  },
}))
