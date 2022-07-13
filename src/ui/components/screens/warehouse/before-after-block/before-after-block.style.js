import {tooltipClasses} from '@mui/material/Tooltip'

const {makeStyles} = require('@material-ui/core')

export const useClassNames = makeStyles(() => ({
  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonsWrapper: {},
  currentBox: {
    marginBottom: '20px',
  },
  currentBoxFooter: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '60px',
  },
  newBoxes: {},
  box: {
    minWidth: '300px',
    marginBottom: '20px',
  },
  itemsWrapper: {
    marginTop: '5px',
  },
  orderChip: {
    backgroundColor: 'rgb(0, 123, 255)',
    color: 'white',
    fontSize: '13px',
    borderRadius: '14px',
    marginLeft: '10px',
  },
  select: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: 'white',
  },
  mainPaper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    padding: '10px',
  },
  chipWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    padding: '5px',
  },
  categoryTitle: {
    fontSize: '16px',
    lineHeight: '20px',
    color: 'rgba(61, 81, 112, 1)',
    fontWeight: '600',
    marginBottom: '12px',
  },
  demensionsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minWidth: '200px',
    padding: '5px',
    marginTop: '10px',
    height: '220px',
  },
  editBtn: {
    marginTop: '5px',
  },
  bottomBlockWrapper: {
    marginTop: '5px',
  },
  editBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  superWrapper: {
    display: 'flex',
    gap: '5px',
  },
  barCodeActionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  shippingLabelField: {
    marginLeft: '5px',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '21px',
    width: '250px',
    height: '45px',
    overflowX: 'auto',
  },
  fieldsWrapper: {
    padding: '0 10px',
  },

  boxInfoWrapper: {
    display: 'flex',
  },

  imagesWrapper: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
  },

  photoWrapper: {
    width: '300px',
    marginLeft: '20px',
    minHeight: '150px',
  },

  imgBox: {
    width: '230px',
    height: '100px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  link: {
    maxWidth: '325px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },

  checkboxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '5px',
  },

  imageLinkListItem: {
    border: ' 1px solid rgba(0,123, 255, .7)',
    borderRadius: '10px',
    background: '#EFEFEF',
    padding: '5px',

    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    width: 90,
    justifyContent: 'space-between',
    margin: '0',
  },

  imgTooltip: {
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 450,
    },
  },

  image: {
    width: 120,
    height: '70px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  imageListItem: {
    border: ' 1px solid rgba(0,123, 255, .7)',
    borderRadius: '10px',
    background: '#EFEFEF',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    padding: 3,
  },

  fileName: {
    maxWidth: 120,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '9px',
  },

  tooltipWrapper: {
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  tooltipImg: {
    width: '300px',
    height: '200px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  linkTypo: {
    height: '100px',
    color: 'white',
    width: '300px',
    overflowX: 'auto',
  },

  tooltipText: {
    maxWidth: '300px',
  },

  greenText: {
    color: 'green',
  },
}))
