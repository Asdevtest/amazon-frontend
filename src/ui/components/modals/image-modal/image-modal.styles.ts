import { makeStyles } from 'tss-react/mui'

export const useImageModalStyles = makeStyles()(theme => ({
  modalContainer: {
    height: '80vh',
    padding: 40,

    [theme.breakpoints.down(768)]: {
      maxHeight: '100vh',
      padding: 20,
    },
  },

  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },
  },

  imagesList: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    gap: 18,
    paddingRight: 20,
    maxHeight: 'calc(80vh - 80px)',

    [theme.breakpoints.down(768)]: {
      maxHeight: '273px',
      overflow: 'auto',
      paddingRight: 0,
      gap: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },

  imagesListItem: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 5,
    padding: '10px',
    border: `1px solid #424250`,
    borderRadius: '4px',
    cursor: 'pointer',
    maxWidth: 120,
    width: '100%',

    img: {
      width: '100%',
      height: 74,
      borderRadius: '4px',
      objectFit: 'contain',
    },

    p: {
      overflowWrap: 'anywhere',
    },

    [theme.breakpoints.down(768)]: {
      width: 'max-content',
      padding: 5,
    },
  },

  imagesListItemTitle: {
    fontSize: 14,
    lineHeight: '19px',
    textAlign: 'center',
  },

  shortText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 100,
  },

  imagesListItemActive: {
    border: `1px solid #4CA1DE`,
  },

  body: {
    padding: '0 50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,

    [theme.breakpoints.down(768)]: {
      gap: 10,
      padding: 0,
    },
  },

  title: {
    fontSize: '14px',
    lineHeight: '19px',
  },

  clientComment: {
    maxWidth: '60%',
    color: '#DF0C0C',
  },

  controls: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 30,
    marginTop: '-0px',
    marginRight: '-100px',

    button: {
      width: 40,
      height: 40,
    },

    [theme.breakpoints.down(768)]: {
      justifyContent: 'space-between',
      padding: '0 17px',
      marginTop: 0,
      marginRight: 0,
    },
  },

  imagesModalBtn: {
    width: 40,
    height: 40,
  },

  activeMainIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    background: 'rgb(53, 112, 155)',
    color: '#F5CF00',
  },

  pasteInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'pointer',
    borderRadius: 10,
  },
}))
