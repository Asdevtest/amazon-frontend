import { makeStyles } from 'tss-react/mui'

export const useRedFlagStyles = makeStyles()(() => ({
  flagIcon: {
    marginLeft: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,

    '& > img': {
      width: '100%',
      height: '100%',
    },
  },
}))
