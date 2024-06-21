import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  imgWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '2px',
    marginRight: 20,

    [theme.breakpoints.down(1282)]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },

  taskDescriptionImg: {
    width: '100%',
    maxHeight: '30px',
    height: '100%',
    objectPosition: 'center',

    [theme.breakpoints.down(1282)]: {
      width: 39,
      height: 39,
    },
  },

  taskDescriptionCountWrapper: {
    marginLeft: 5,
  },

  taskDescriptionSuperBox: {
    fontWeight: 600,
    fontSize: 18,
    color: theme.palette.primary.main,
    minWidth: 'max-content',
  },

  imgNum: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.primary.main,
  },

  imagesWrapper: {
    width: 'max-content',

    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    gap: '5px',
    padding: '3px',
    marginRight: '5px',
  },

  standartBoxWrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'repeat(3, auto)',
    gap: 5,

    maxHeight: 200,

    [theme.breakpoints.down(1282)]: {
      gridTemplateColumns: 'none',
    },
  },

  blockProductsImagesWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  sideWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',

    padding: '10px 0',
  },

  renderBoxWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  taskDescriptionIcon: {
    color: theme.palette.primary.main,
    margin: '0 8px',
  },

  taskTableCell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  receiveOrEditWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    gap: 10,
    height: 50,

    'img:first-of-type': {
      width: 'fit-content',
      height: '100%',
    },
  },

  bigBoxSvg: {
    [theme.breakpoints.down(1282)]: {
      width: 47,
      height: 51,
    },
  },

  boxArrowSvg: {
    color: theme.palette.primary.main,

    [theme.breakpoints.down(1282)]: {
      width: 22,
      height: 22,
    },
  },

  gridBoxesWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 5,
  },

  gridBoxWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 5,
    marginRight: 20,
  },

  superboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    marginRight: 5,
  },

  cubeIconSvg: {
    color: theme.palette.primary.main,
  },

  gridEditWrapper: {
    display: 'flex',
    gap: 16,
    marginRight: 10,
  },

  boxEditSvg: {
    color: theme.palette.primary.main,

    [theme.breakpoints.down(1282)]: {
      width: 22,
      height: 22,
    },
  },

  taskDescriptionScrollWrapper: {
    width: '100%',
    overflowX: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflowY: 'auto',
    margin: '10px 0',
    padding: '5px 0',
  },
}))
