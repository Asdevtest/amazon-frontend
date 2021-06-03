import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  avatar: {
    height: '140px',
    width: '140px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  username: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '32px',
    fontWeight: 500,
  },
  text: {
    color: '#89919C',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 500,
    color: 'rgba(61, 81, 112, 1)',
  },
  tableHeadTypography: {
    color: 'rgb(61, 81, 112)',
    fontWeight: 500,
  },
  paper: {
    padding: '24px',
  },
  mainBox: {
    display: 'flex',
  },
  sendOrderBox: {
    marginRight: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  hisGoodsOptionsBox: {
    display: 'flex',
  },
  filterGoods: {
    color: 'rgba(0, 123, 255, 1)',
    marginRight: '16px',
  },
  ignoreGoods: {
    color: 'rgba(0, 123, 255, 1)',
  },
  normalBox: {
    display: 'flex',
    margin: '12px 0',
  },
  visibilityIcon: {
    color: 'rgba(0, 123, 255, 1)',
    marginRight: '8px',
  },
  boxFeedbackCard: {
    marginRight: '16px',
  },
}))
