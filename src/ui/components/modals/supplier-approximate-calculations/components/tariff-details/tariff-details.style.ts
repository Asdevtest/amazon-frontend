import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    paddingLeft: '50px',
    display: 'flex',
    backgroundColor: theme.palette.background.general,
  },

  tariffDetails: {
    width: '140px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px',
  },

  destinationName: {
    padding: '0 5px',
    width: '100px',
    textAlign: 'center',
  },

  tariffTitle: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  tariffDescription: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
  },

  destinationVariationsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  borderRight: {
    borderRight: `1px solid ${theme.palette.input.customBorder}`,
  },

  borderBotton: {
    borderBottom: `1px solid ${theme.palette.input.customBorder}`,
  },

  borderLeft: {
    borderLeft: `1px solid ${theme.palette.input.customBorder}`,
  },

  destination: {
    marginLeft: '10px',
    display: 'flex',
    width: '128px',
    gap: '5px',
  },

  withoutCheckbox: {
    paddingLeft: '40px',
  },

  price: {
    width: '80px',
    textAlign: 'center',
  },

  destinationVariationWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  dateParamWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '140px',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10px',
  },

  dateParam: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '15px',

    svg: {
      width: '25px',
      height: '20px',

      color: theme.palette.primary.main,

      '> g': {
        '> path': {
          fill: theme.palette.background.gray,
        },
      },
    },
  },

  iconWrapper: {
    position: 'relative',
  },

  tooltip: {
    position: 'absolute',
    top: '0',
    right: '0',
    transform: 'translate(90%, -30%)',

    svg: {
      width: '13px !important',
      height: '13px !important',
    },
  },

  deliveryTimeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '130px',
  },

  costUnitWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
  },

  destinationCostUnitWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '131px',
    height: '100%',
  },

  destinationRoiWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '139px',
    height: '100%',
  },

  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  weightWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  badRoi: {
    color: '#FC0032',
    backgroundColor: theme.palette.roi.bad,
  },

  normalRoi: {
    color: '#C69109',
    backgroundColor: theme.palette.roi.normal,
  },

  goodRoi: {
    color: '#0B903E',
    backgroundColor: theme.palette.roi.good,
  },
}))
