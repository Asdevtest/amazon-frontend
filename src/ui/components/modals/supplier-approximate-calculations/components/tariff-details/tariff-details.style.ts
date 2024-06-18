import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => {
  const boxShadow = '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D'

  return {
    root: {
      display: 'flex',
    },

    tariffDetails: {
      width: '190px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
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
    },

    destination: {
      display: 'flex',
    },

    withoutCheckbox: {
      paddingLeft: '40px',
    },

    destinationVariationWrapper: {
      display: 'flex',
      gap: '10px',
    },

    dateParamWrapper: {
      display: 'flex',
      flexDirection: 'column',
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
  }
})
