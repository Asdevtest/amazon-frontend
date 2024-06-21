import { keyframes } from '@emotion/react'
import { makeStyles } from 'tss-react/mui'

const spinnerOne = keyframes`
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
    border-width: 1px;
  }

  100% {
    transform: rotate(360deg);
  }
`

const spinnerTwo = keyframes`
  0% {
    transform: rotate(0deg);
    border-width: 1px;
  }

  50% {
    transform: rotate(180deg);
    border-width: 5px;
  }

  100% {
    transform: rotate(360deg);
    border-width: 1px;
  }
`

export const useStyles = makeStyles()(theme => {
  const primaryMain = theme.palette.primary.main

  return {
    spinner: {
      position: 'relative',

      div: {
        width: '100%',
        height: '100%',
        border: '5px solid transparent',
        borderTopColor: primaryMain,
        borderRadius: '50%',
        position: 'absolute',
        animation: `${spinnerOne} 1.2s linear infinite`,
      },

      'div:nth-of-type(2)': {
        border: '5px solid transparent',
        borderBottomColor: primaryMain,
        animation: `${spinnerTwo} 1.2s linear infinite`,
      },
    },
  }
})
