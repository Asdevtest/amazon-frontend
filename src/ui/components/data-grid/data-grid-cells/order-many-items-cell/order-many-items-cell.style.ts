import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
  manyItemsOrderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  order: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    padding: '10px 0',
  },

  orderImg: {
    height: 64,
    width: 64,
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: 4,
  },

  orderImageBig: {
    height: 100,
    width: 100,
  },

  manyItemsOrderTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 500,
    maxHeight: 19,
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },

  needPay: {
    color: 'red',
    fontWeight: 'bold',
    width: 'fit-content',
  },

  orderCellError: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: '15px',
  },

  manyItemsMainWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  manyItemsMainWrapperTooltip: {
    maxHeight: 260,
    overflow: 'auto',
  },

  manyItemsImagesWrapper: {
    height: '75px',
    border: '1px solid rgba(0, 123, 255, 0.5)',
    borderRadius: '10px',
    gap: '3px',
    padding: '3px',
    display: 'flex',
    alignItems: 'center',
    marginRight: '5px',
    width: 'min-content',
  },

  manyItemsImgWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    whiteSpace: 'nowrap',
  },

  ordersImg: {
    width: '30px',
    height: '30px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  imgNum: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.primary.main,
  },
}))
