import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  '@global': {
    '@keyframes hypnoEye': {
      '0%': {
        transform: 'scale(0)',
      },
      '100%': {
        transform: 'scale(1)',
      },
    },
  },

  chip: props => ({
    color: '#000',
    fontSize: '14px',
    transition: '.7s ease-in-out',
    backgroundColor: props.color,
    '&:hover, &:focus': {
      backgroundColor: props.colorHover,
      transform: 'scale(1.01)',
    },
  }),
  chipActive: () => ({
    color: '#fff',

    '&::before': {
      content: '""',
      backgroundColor: 'black',
      height: '32px',
      width: '32px',
      right: '30%',
      textAlign: 'center',
      borderRadius: '16px',
      opacity: '0.4',
      border: '7px solid white',
      animation: 'hypnoEye .7s ease-in-out',
    },
  }),
}))
