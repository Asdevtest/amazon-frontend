import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  infoWrapper: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    overflowY: 'scroll',
    paddingRight: '5px',
    scrollbarGutter: 'stable',
    alignItems: 'flex-start',
    alignContent: 'flex-start',

    '::-webkit-scrollbar': {
      display: 'none',
      background: 'transparent',
      width: '4px',
    },

    '&:hover': {
      paddingRight: '1px',
      '::-webkit-scrollbar': {
        display: 'block',
      },
    },
  },

  infoWrapperColumns: {
    flexWrap: 'wrap',
    gap: '5px',
    flexDirection: 'row',
  },

  spinnerContainer: {
    width: '100%',
    height: '50px',
    marginTop: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
